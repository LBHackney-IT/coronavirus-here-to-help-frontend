import CallbackForm from '../../../../components/CallbackForm/CallbackForm';
import Layout from '../../../../components/layout';
import Link from 'next/link';
import KeyInformation from '../../../../components/KeyInformation/KeyInformation';
import { ResidentGateway } from '../../../../gateways/resident';
import { unsafeExtractUser } from '../../../../helpers/auth';
import React, { useEffect, useState } from 'react';
import { HelpRequestGateway } from '../../../../gateways/help-request';
import { HelpRequestCallGateway } from '../../../../gateways/help-request-call';
import { CaseNotesGateway } from '../../../../gateways/case-notes';
import { useRouter } from 'next/router';
import CallHistory from '../../../../components/CallHistory/CallHistory';
import CaseNotes from '../../../../components/CaseNotes/CaseNotes';
import { helpTypes } from '../../../../helpers/constants';
import { GovNotifyGateway } from '../../../../gateways/gov-notify';
import {
    TEST_AND_TRACE_FOLLOWUP_TEXT,
    TEST_AND_TRACE_FOLLOWUP_EMAIL
} from '../../../../helpers/constants';
import getTimeZoneCorrectedLocalDate from '../../../../../tools/etcUtility';

export default function addSupportPage({ residentId, helpRequestId }) {
    const backHref = `/helpcase-profile/${residentId}`;

    const [resident, setResident] = useState({});
    const [user, setUser] = useState({});
    const [calls, setCalls] = useState([]);
    const [helpRequest, setHelpRequest] = useState({});
    const [caseNotes, setCaseNotes] = useState({
        'All': [],
        'Welfare Call': [],
        'Help Requesst': [],
        'Contact Tracing': [],
        'CEV': [],
        'helpType': null
    });

    const router = useRouter();

    const retreiveResidentAndUser = async () => {
        const gateway = new ResidentGateway();
        const resident = await gateway.getResident(residentId);
        setResident(resident);
        const user = unsafeExtractUser();
        setUser(user);
    };

    const retreiveHelpRequest = async () => {
        try {
            const gateway = new HelpRequestGateway();
            const response = await gateway.getHelpRequest(residentId, helpRequestId);

            const caseNotesGateway = new CaseNotesGateway();
            const helpRequestCaseNotes = await caseNotesGateway.getHelpRequestCaseNotes(
                residentId,
                helpRequestId
            );

            let categorisedCaseNotes = {
                'All': [],
                'Welfare Call': [],
                'Help Request': [],
                'Contact Tracing': [],
                'CEV': [],
                'Link Work': []
            };
            if (helpRequestCaseNotes) {
                helpRequestCaseNotes.forEach((helpRequestCaseNote) => {
                    helpRequestCaseNote.caseNote.forEach((note) => {
                        note.helpNeeded = response.helpNeeded;
                        categorisedCaseNotes[note.helpNeeded].push(note);
                        categorisedCaseNotes['All'].push(note);
                    });

                    helpTypes.forEach((helpType) => {
                        categorisedCaseNotes[helpType].sort(
                            (a, b) => new Date(b.noteDate) - new Date(a.noteDate)
                        );
                    });
                });
                categorisedCaseNotes.helpType = response.helpNeeded; // what is this supposed to do???
                setCaseNotes(categorisedCaseNotes);
            }

            setHelpRequest(response);
            setCalls(
                response.helpRequestCalls.sort(
                    (a, b) => new Date(b.callDateTime) - new Date(a.callDateTime)
                )
            );
        } catch (err) {
            console.log(`Error getting resident props with help request ID ${residentId}: ${err}`);
        }
    };

    useEffect(async () => {
        await retreiveResidentAndUser();
    }, []);

    useEffect(async () => {
        await retreiveHelpRequest();
    }, []);

    const saveFunction = async function (
        helpNeeded,
        callDirection,
        callOutcomeValues,
        helpRequestObject,
        callMade,
        caseNote,
        phoneNumber,
        email
    ) {
        const callRequestObject = {
            callType: helpNeeded,
            callDirection: callDirection,
            callOutcome: callOutcomeValues,
            callDateTime: getTimeZoneCorrectedLocalDate(),
            callHandler: user.name
        };

        const errorHasHappened = false;

        try {
            const helpRequestGateway = new HelpRequestGateway();
            const caseNotesGateway = new CaseNotesGateway();
            let govNotifyGateway = new GovNotifyGateway();

            let patchHelpRequest = {
                callbackRequired: helpRequestObject.callbackRequired,
                initialCallbackCompleted: helpRequestObject.initialCallbackCompleted
            };

            await helpRequestGateway
                .patchHelpRequest(helpRequestId, patchHelpRequest)
                .catch((err) => {
                    errorHasHappened = true;
                    const hrCNPatchFailure = "Error happened while PATCH'ing a Help Request.";
                    const hrPatchObjectVals = Object.values(patchHelpRequest).filter((v) => v)
                        .length;

                    console.error(
                        `${hrCNPatchFailure}\nHelpReqId: ${helpRequestId}, HRPatchnonEmptyFieldsNum: ${hrPatchObjectVals}\n${err}`
                    );
                    alert(hrCNPatchFailure); // warning user about potential loss of data
                });

            if (callMade) {
                const helpRequestCallGateway = new HelpRequestCallGateway();
                await helpRequestCallGateway
                    .postHelpRequestCall(helpRequestId, callRequestObject)
                    .catch((err) => {
                        errorHasHappened = true;
                        const hrCallPostFailure =
                            "Error happened while POST'ing Help Request Call.";
                        const nonEmptyHRCallObjectVals = Object.values(callRequestObject).filter(
                            (v) => v
                        ).length;

                        console.error(
                            `${hrCallPostFailure}\nHelpReqId: ${helpRequestId}, HRCallnonEmptyFieldsNum: ${nonEmptyHRCallObjectVals}\n${err}`
                        );
                        alert(hrCallPostFailure); // warning user about potential loss of data
                    });
            }

            if (caseNote && caseNote != '') {
                const caseNoteObject = {
                    caseNote,
                    author: user.name,
                    noteDate: new Date().toGMTString(),
                    helpNeeded: helpRequest.helpNeeded
                };
                await caseNotesGateway
                    .createCaseNote(helpRequestId, residentId, caseNoteObject)
                    .catch((err) => {
                        errorHasHappened = true;
                        const hrCNPostFailure =
                            "Error happened while POST'ing Help Request Case Note.";
                        const nonEmptyHRCNObjectVals = Object.values(caseNoteObject).filter(
                            (v) => v
                        ).length;

                        console.error(
                            `${hrCNPostFailure}\nResId: ${residentId}, HelpReqId: ${helpRequestId}, HRCNnonEmptyFieldsNum: ${nonEmptyHRCNObjectVals}\n${err}`
                        );
                        alert(hrCNPostFailure); // warning user about potential loss of data
                    });
            }

            if (phoneNumber) {
                let textResponse = await govNotifyGateway
                    .sendText(phoneNumber, TEST_AND_TRACE_FOLLOWUP_TEXT)
                    .catch((err) => {
                        errorHasHappened = true;
                        const smsFailure = 'Error happened while sending a text message.';

                        console.error(`${smsFailure}\nPhoneNumber: ${phoneNumber}\n${err}`);
                        alert(smsFailure); // warning user about potential loss of data
                    });

                let sendTextResponseCaseNoteObject;
                if (textResponse.id) {
                    sendTextResponseCaseNoteObject = {
                        caseNote: `Text sent to ${phoneNumber}. \n Text id: ${textResponse.id}.\n Text content: ${textResponse.content.body}`,
                        author: user.name,
                        noteDate: new Date().toGMTString(),
                        helpNeeded: helpRequest.helpNeeded
                    };
                } else {
                    sendTextResponseCaseNoteObject = {
                        caseNote: `Failed text to ${phoneNumber}`,
                        author: user.name,
                        noteDate: new Date().toGMTString(),
                        helpNeeded: helpRequest.helpNeeded
                    };
                }

                await caseNotesGateway
                    .createCaseNote(helpRequestId, residentId, sendTextResponseCaseNoteObject)
                    .catch((err) => {
                        errorHasHappened = true;
                        const hrCNPostFailure =
                            "Error happened while POST'ing Text Confirmation Help Request Case Note.";
                        const nonEmptyTextRespObjectVals = Object.values(
                            sendTextResponseCaseNoteObject
                        ).filter((v) => v).length;

                        console.error(
                            `${hrCNPostFailure}\nResId: ${residentId}, HelpReqId: ${helpRequestId}, TextRespnonEmptyFieldsNum: ${nonEmptyTextRespObjectVals}\n${err}`
                        );
                        alert(hrCNPostFailure); // warning user about potential loss of data
                    });
            }

            if (email) {
                let emailResponse = await govNotifyGateway
                    .sendEmail(email, TEST_AND_TRACE_FOLLOWUP_EMAIL)
                    .catch((err) => {
                        errorHasHappened = true;
                        const emailFailure = 'Error happened while sending an email.';

                        console.error(`${emailFailure}\nEmail: ${email}\n${err}`);
                        alert(emailFailure); // warning user about potential loss of data
                    });

                let sendEmailResponseCaseNoteObject;

                if (emailResponse.id) {
                    sendEmailResponseCaseNoteObject = {
                        caseNote: `Email sent to ${email}. Email id: ${emailResponse.id}. Email content: ${emailResponse.content.body}`,
                        author: user.name,
                        noteDate: new Date().toGMTString(),
                        helpNeeded: helpRequest.helpNeeded
                    };
                } else {
                    sendEmailResponseCaseNoteObject = {
                        caseNote: `Failed email to ${email}`,
                        author: user.name,
                        noteDate: new Date().toGMTString(),
                        helpNeeded: helpRequest.helpNeeded
                    };
                }
                await caseNotesGateway
                    .createCaseNote(helpRequestId, residentId, sendEmailResponseCaseNoteObject)
                    .catch((err) => {
                        errorHasHappened = true;
                        const hrCNPostFailure =
                            "Error happened while POST'ing Email Confirmation Help Request Case Note.";
                        const nonEmptyEmailRespObjectVals = Object.values(
                            sendEmailResponseCaseNoteObject
                        ).filter((v) => v).length;

                        console.error(
                            `${hrCNPostFailure}\nResId: ${residentId}, HelpReqId: ${helpRequestId}, EmailRespnonEmptyFieldsNum: ${nonEmptyEmailRespObjectVals}\n${err}`
                        );
                        alert(hrCNPostFailure); // warning user about potential loss of data
                    });
            }

            if (!errorHasHappened) {
                router.push(`/helpcase-profile/${residentId}`);
            }
        } catch (err) {
            // Other errors.
            console.log('Add support error', err);
            alert('An error has occured while saving the data.');
        }
    };

    return (
        <Layout>
            <div>
                <Link href={backHref}>
                    <a href="#" className="govuk-back-link">
                        Back
                    </a>
                </Link>
                <div className="govuk-grid-row">
                    <div className="govuk-grid-column-one-quarter-from-desktop">
                        <KeyInformation resident={resident} />
                    </div>
                    <div className="govuk-grid-column-three-quarters-from-desktop">
                        <CallbackForm
                            residentId={residentId}
                            resident={resident}
                            helpRequest={helpRequest}
                            backHref={backHref}
                            saveFunction={saveFunction}
                            editableCaseNotes={true}
                            helpRequestExists={true}
                        />
                        <hr className="govuk-section-break govuk-section-break--m govuk-section-break--visible" />
                        <CallHistory calls={calls} />
                        <CaseNotes caseNotes={caseNotes} />
                    </div>
                </div>
            </div>
        </Layout>
    );
}

addSupportPage.getInitialProps = async ({ query: { residentId, helpRequestId }, req, res }) => {
    try {
        return {
            residentId,
            helpRequestId
        };
    } catch (err) {
        console.log(`Error getting resident props with help request ID ${residentId}: ${err}`);
    }
};
