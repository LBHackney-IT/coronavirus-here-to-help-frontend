import CallbackForm from "../../../../components/CallbackForm/CallbackForm";
import Layout from "../../../../components/layout";
import Link from "next/link";
import KeyInformation from "../../../../components/KeyInformation/KeyInformation";
import {ResidentGateway} from "../../../../gateways/resident";
import {unsafeExtractUser} from "../../../../helpers/auth";
import React, { useEffect, useState } from "react";
import {HelpRequestGateway} from "../../../../gateways/help-request";
import {HelpRequestCallGateway} from "../../../../gateways/help-request-call";
import {CaseNotesGateway} from "../../../../gateways/case-notes";
import {useRouter} from "next/router";
import CallHistory from '../../../../components/CallHistory/CallHistory';
import CaseNotes from '../../../../components/CaseNotes/CaseNotes';
import { helpTypes } from "../../../../helpers/constants";
import {GovNotifyGateway} from '../../../../gateways/gov-notify'
import {TEST_AND_TRACE_FOLLOWUP_TEXT, TEST_AND_TRACE_FOLLOWUP_EMAIL} from '../../../../helpers/constants'

export default function addSupportPage({residentId, helpRequestId}) {
    const backHref = `/helpcase-profile/${residentId}`;

    const [resident, setResident] = useState({})
    const [user, setUser] = useState({})
    const [calls, setCalls] = useState([])
    const [helpRequest, setHelpRequest] = useState([])
    const [caseNotes, setCaseNotes] = useState({
        "All":[],
        "Welfare Call":[],
        "Help Requesst":[],
        "Contact Tracing":[],
        "CEV":[],
        "helpType": null
    })

    const router = useRouter()

    const retreiveResidentAndUser = async ( ) => {
        const gateway = new ResidentGateway();
        const resident = await gateway.getResident(residentId);
        setResident(resident)
        const user = unsafeExtractUser()
        setUser(user)
    }

    const retreiveHelpRequest = async ( ) => {
        try {
            const gateway = new HelpRequestGateway();
            const response = await gateway.getHelpRequest(residentId, helpRequestId);

            const caseNotesGateway = new CaseNotesGateway();
            const helpRequestCaseNotes = await caseNotesGateway.getHelpRequestCaseNotes(residentId, helpRequestId)

            let categorisedCaseNotes = {"All":[],
                                        "Welfare Call":[],
                                        "Help Request":[],
                                        "Contact Tracing":[],
                                        "CEV":[]}
            if(!helpRequestCaseNotes) return
            helpRequestCaseNotes.forEach(helpRequestCaseNote => {
                helpRequestCaseNote.caseNote.forEach(note => {
                    note.helpNeeded = response.helpNeeded
                    categorisedCaseNotes[note.helpNeeded].push(note)
                    categorisedCaseNotes['All'].push(note)
                });
            
                helpTypes.forEach(helpType => {
                    categorisedCaseNotes[helpType].sort((a, b) => new Date(b.noteDate) - new Date(a.noteDate))
                }); 
            });

            categorisedCaseNotes.helpType = response.helpNeeded
            setCaseNotes(categorisedCaseNotes)
            setHelpRequest(response);
            setCalls(response.helpRequestCalls.sort((a,b) => new Date(b.callDateTime) - new Date(a.callDateTime)))
        } catch (err) {
            console.log(`Error getting resident props with help request ID ${residentId}: ${err}`);
        }
    }

    useEffect(async () => {
        await retreiveResidentAndUser()
    }, []);

    useEffect(async () => {
        await retreiveHelpRequest()
    }, []);

    const saveFunction = async function(helpNeeded, callDirection, callOutcomeValues, helpRequestObject, callMade, caseNote, phoneNumber, email) {
        const callRequestObject = {
            callType: helpNeeded,
            callDirection: callDirection,
            callOutcome: callOutcomeValues,
            callDateTime: new Date(),
            callHandler: user.name
        }

        try{

            const helpRequestGateway = new HelpRequestGateway();
            const caseNotesGateway = new CaseNotesGateway();
            let govNotifyGateway = new GovNotifyGateway()

            let patchHelpRequest = {
                callbackRequired: helpRequestObject.callbackRequired
            }

            await helpRequestGateway.patchHelpRequest(helpRequestId, patchHelpRequest);

            if(callMade) {
                const helpRequestCallGateway = new HelpRequestCallGateway();
                const helpRequestCallId = await helpRequestCallGateway.postHelpRequestCall(helpRequestId, callRequestObject);
            }

            if (caseNote && caseNote != "") {
                const caseNoteObject = {
                    caseNote,
                    author: user.name,
                    noteDate: new Date().toGMTString(),
                    helpNeeded: helpRequest.helpNeeded
                };      
                await caseNotesGateway.createCaseNote(helpRequestId, residentId, caseNoteObject);
            }

            if(phoneNumber){
                let textResponse = await govNotifyGateway.sendText(phoneNumber, TEST_AND_TRACE_FOLLOWUP_TEXT)
                let sendTextResponseCaseNoteObject
                if(textResponse.id){
                    sendTextResponseCaseNoteObject = {
                        caseNote: `Text sent to ${phoneNumber}. \n Text id: ${textResponse.id}.\n Text content: ${textResponse.content.body}`,
                        author: user.name,
                        noteDate: new Date().toGMTString(),
                        helpNeeded: helpRequest.helpNeeded 
                    }
                }else{
                    sendTextResponseCaseNoteObject ={
                        caseNote: `Failed text to ${phoneNumber}`,
                        author: user.name,
                        noteDate: new Date().toGMTString(),
                        helpNeeded: helpRequest.helpNeeded 
                    }
                }

                await caseNotesGateway.createCaseNote(helpRequestId, residentId, sendTextResponseCaseNoteObject)
           
            }
            if(email){
                let emailResponse = await govNotifyGateway.sendEmail(email, TEST_AND_TRACE_FOLLOWUP_EMAIL)
                let sendEmailResponseCaseNoteObject

                if(emailResponse.id){
                    sendEmailResponseCaseNoteObject = {
                        caseNote: `Email sent to ${email}. Email id: ${emailResponse.id}. Email content: ${emailResponse.content.body}`,
                        author: user.name,
                        noteDate: new Date().toGMTString(),
                        helpNeeded: helpRequest.helpNeeded 
                    }
                }else{
                    sendEmailResponseCaseNoteObject ={
                        caseNote: `Failed email to ${email}`,
                        author: user.name,
                        noteDate: new Date().toGMTString(),
                        helpNeeded: helpRequest.helpNeeded 
                    }
                }
                await caseNotesGateway.createCaseNote(helpRequestId, residentId, sendEmailResponseCaseNoteObject)

            }
            router.push(`/helpcase-profile/${residentId}`)
        } catch(err){
            console.log("Add support error", err)
        }
    };

    return (
        <Layout>
            <div>
                <Link href={backHref}>
                    <a href="#" className="govuk-back-link">Back</a>
                </Link>
                <div className="govuk-grid-row">
                    <div className="govuk-grid-column-one-quarter-from-desktop">
                        <KeyInformation resident={resident}/>
                    </div>
                    <div className="govuk-grid-column-three-quarters-from-desktop">
                        <CallbackForm residentId={residentId} resident={resident} helpRequest={helpRequest} backHref={backHref} saveFunction={saveFunction} editableCaseNotes={true} />
                        <hr className="govuk-section-break govuk-section-break--m govuk-section-break--visible" />
                        <CallHistory calls={calls}  />
                        <CaseNotes caseNotes={caseNotes}/>
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
