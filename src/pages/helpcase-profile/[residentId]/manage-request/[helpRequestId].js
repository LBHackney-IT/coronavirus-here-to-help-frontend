import CallbackForm from "../../../../components/CallbackForm/CallbackForm";
import Layout from "../../../../components/layout";
import Link from "next/link";
import KeyInformation from "../../../../components/KeyInformation/KeyInformation";
import {ResidentGateway} from "../../../../gateways/resident";
import {unsafeExtractUser} from "../../../../helpers/auth";
import React, { useEffect, useState } from "react";
import {HelpRequestGateway} from "../../../../gateways/help-request";
import {HelpRequestCallGateway} from "../../../../gateways/help-request-call";
import {useRouter} from "next/router";
import CallHistory from '../../../../components/CallHistory/CallHistory';
import CaseNotes from '../../../../components/CaseNotes/CaseNotes';
import { helpTypes } from "../../../../helpers/constants";

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
        "CEV":[]
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
            let categorisedCaseNotes = {"All":[],
                                        "Welfare Call":[],
                                        "Help Request":[],
                                        "Contact Tracing":[],
                                        "CEV":[]}
            if(!response.caseNotes) return
            response.caseNotes.forEach(caseNote => {
                caseNote.manageCaseNotePage = true
                categorisedCaseNotes[caseNote.helpNeeded].push(caseNote)
                categorisedCaseNotes['All'].push(caseNote)
            });
        
            helpTypes.forEach(helpType => {
                categorisedCaseNotes[helpType].sort((a, b) => new Date(b.noteDate) - new Date(a.noteDate))
            });
            console.log(categorisedCaseNotes)
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

    const saveFunction = async function(helpNeeded, callDirection, callOutcomeValues, helpRequestObject, callMade) {
        let callRequestObject = {
            callType: helpNeeded,
            callDirection: callDirection,
            callOutcome: callOutcomeValues,
            callDateTime: new Date(),
            callHandler: user.name
        }

        try{

            let helpRequestGateway = new HelpRequestGateway();

            helpRequestObject["residentId"] = residentId;

            await helpRequestGateway.patchHelpRequest(helpRequestId,  helpRequestObject);

            if(callMade) {
                let helpRequestCallGateway = new HelpRequestCallGateway();
                let helpRequestCallId = await helpRequestCallGateway.postHelpRequestCall(helpRequestId, callRequestObject);
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
                        <CallbackForm residentId={residentId} resident={resident} helpRequest={helpRequest} backHref={backHref} saveFunction={saveFunction} />
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
