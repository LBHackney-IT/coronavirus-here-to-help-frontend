import CallbackForm from '../../../components/CallbackForm/CallbackForm';
import Layout from '../../../components/layout';
import Link from 'next/link';
import KeyInformation from '../../../components/KeyInformation/KeyInformation';
import { ResidentGateway } from '../../../gateways/resident';
import { unsafeExtractUser } from '../../../helpers/auth';
import React, { useEffect, useState } from 'react';
import { HelpRequestGateway } from '../../../gateways/help-request';
import { HelpRequestCallGateway } from '../../../gateways/help-request-call';
import { CaseNotesGateway } from '../../../gateways/case-notes';
import { useRouter } from 'next/router';
import { GovNotifyGateway } from '../../../gateways/gov-notify';
import {
    TEST_AND_TRACE_FOLLOWUP_EMAIL,
    TEST_AND_TRACE_FOLLOWUP_TEXT
} from '../../../helpers/constants';
import getTimeZoneCorrectedLocalDate from '../../../../tools/etcUtility';

export default function addSupportPage({ residentId }) {
    const backHref = `/helpcase-profile/${residentId}`;

    const [resident, setResident] = useState({});
    const [user, setUser] = useState({});

    const router = useRouter();

    const retreiveResidentAndUser = async () => {
        const gateway = new ResidentGateway();
        const resident = await gateway.getResident(residentId);
        setResident(resident);
        const user = unsafeExtractUser();
        setUser(user);
    };

    useEffect(() => { retreiveResidentAndUser(); }, []); // used to have await

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
        let callRequestObject = {
            callType: helpNeeded,
            callDirection: callDirection,
            callOutcome: callOutcomeValues,
            callDateTime: getTimeZoneCorrectedLocalDate(),
            callHandler: user.name
        };
        let errorHasHappened = false;

        try {
            let helpRequestGateway = new HelpRequestGateway();
            const caseNotesGateway = new CaseNotesGateway();
            let govNotifyGateway = new GovNotifyGateway();

            let helpRequestId = await helpRequestGateway
                .postHelpRequest(residentId, helpRequestObject)
                .catch((err) => {
                    errorHasHappened = true;
                    const hrPostFailure = "Error happened while POST'ing Help Request.";
                    const nonEmptyHRObjectVals = Object.values(helpRequestObject).filter((v) => v)
                        .length;

                    console.error(
                        `${hrPostFailure}\nResId: ${residentId}, HRnonEmptyFieldsNum: ${nonEmptyHRObjectVals}\n${err}`
                    );
                    alert(hrPostFailure); // warning user about potential loss of data
                });

            if (callMade) {
                let helpRequestCallGateway = new HelpRequestCallGateway();
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
                    helpNeeded: helpNeeded
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
                        helpNeeded: helpRequestObject.helpNeeded
                    };
                } else {
                    sendTextResponseCaseNoteObject = {
                        caseNote: `Failed text to ${phoneNumber}`,
                        author: user.name,
                        noteDate: new Date().toGMTString(),
                        helpNeeded: helpRequestObject.helpNeeded
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
                        helpNeeded: helpRequestObject.helpNeeded
                    };
                } else {
                    sendEmailResponseCaseNoteObject = {
                        caseNote: `Failed email to ${email}`,
                        author: user.name,
                        noteDate: new Date().toGMTString(),
                        helpNeeded: helpRequestObject.helpNeeded
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
                            backHref={backHref}
                            saveFunction={saveFunction}
                            editableCaseNotes={true}
                            helpRequestExists={false}
                        />
                    </div>
                </div>
            </div>
        </Layout>
    );
}

addSupportPage.getInitialProps = async ({ query: { residentId } }) => {
    try {
        return {
            residentId
        };
    } catch (err) {
        console.log(`Error getting resident props with help request ID ${residentId}: ${err}`);
    }
};
