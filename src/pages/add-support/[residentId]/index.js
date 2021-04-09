import CallbackForm from "../../../components/CallbackForm/CallbackForm";
import Layout from "../../../components/layout";
import Link from "next/link";
import KeyInformation from "../../../components/KeyInformation/KeyInformation";
import {ResidentGateway} from "../../../gateways/resident";
import {unsafeExtractUser} from "../../../helpers/auth";
import React, { useEffect, useState } from "react";
import {HelpRequestGateway} from "../../../gateways/help-request";
import {HelpRequestCallGateway} from "../../../gateways/help-request-call";
import {CaseNotesGateway} from "../../../gateways/case-notes";
import {useRouter} from "next/router";
import {GovNotifyGateway} from '../../../gateways/gov-notify'
import { TEST_AND_TRACE_FOLLOWUP_EMAIL, TEST_AND_TRACE_FOLLOWUP_TEXT } from "../../../helpers/constants";

export default function addSupportPage({residentId}) {
	const backHref = `/helpcase-profile/${residentId}`;

	const [resident, setResident] = useState({});
	const [user, setUser] = useState({});

	const router = useRouter();

	const retreiveResidentAndUser = async ( ) => {
		const gateway = new ResidentGateway();
		const resident = await gateway.getResident(residentId);
		setResident(resident)
		const user = unsafeExtractUser()
		setUser(user)
	}

	useEffect(async () => {
		await retreiveResidentAndUser()
	}, []);

	const saveFunction = async function(helpNeeded, callDirection, callOutcomeValues, helpRequestObject, callMade, caseNote, phoneNumber, email) {
		const tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
		const localTimeTZCorrectedBase = new Date(Date.now() - tzoffset);
		
		let callRequestObject = {
			callType: helpNeeded,
			callDirection: callDirection,
			callOutcome: callOutcomeValues,
			callDateTime: localTimeTZCorrectedBase,
			callHandler: user.name
		}

		try {
			let helpRequestGateway = new HelpRequestGateway();
			const caseNotesGateway = new CaseNotesGateway();
			let govNotifyGateway = new GovNotifyGateway()

			let helpRequestId = await helpRequestGateway.postHelpRequest(residentId, helpRequestObject);

			if(callMade) {
				let helpRequestCallGateway = new HelpRequestCallGateway()
				let helpRequestCallId = await helpRequestCallGateway.postHelpRequestCall(helpRequestId, callRequestObject)
			}
			if (caseNote && caseNote != "") {
				const caseNoteObject = {
						caseNote,
						author: user.name,
						noteDate: new Date().toGMTString(),
						helpNeeded: helpNeeded
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
								helpNeeded: helpRequestObject.helpNeeded 
						}
				}else{
						sendTextResponseCaseNoteObject ={
								caseNote: `Failed text to ${phoneNumber}`,
								author: user.name,
								noteDate: new Date().toGMTString(),
								helpNeeded: helpRequestObject.helpNeeded 
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
								helpNeeded: helpRequestObject.helpNeeded 
						}
				}else{
						sendEmailResponseCaseNoteObject ={
								caseNote: `Failed email to ${email}`,
								author: user.name,
								noteDate: new Date().toGMTString(),
								helpNeeded: helpRequestObject.helpNeeded 
						}
				}
				await caseNotesGateway.createCaseNote(helpRequestId, residentId, sendEmailResponseCaseNoteObject)

		}
			router.push(`/helpcase-profile/${residentId}`)
		} catch (err) {
			console.log("Add support error", err)
		}
	}

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
						<CallbackForm residentId={residentId} resident={resident} backHref={backHref} saveFunction={saveFunction} editableCaseNotes={true} helpRequestExists={false} />
					</div>
				</div>
			</div>
		</Layout>
	);
}

addSupportPage.getInitialProps = async ({ query: { residentId }, req, res }) => {
	try {
		return {
			residentId,
		};
	} catch (err) {
		console.log(`Error getting resident props with help request ID ${residentId}: ${err}`);
	}
};