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

	const saveFunction = async function(helpNeeded, callDirection, callOutcomeValues, helpRequestObject, callMade, caseNote) {
		let callRequestObject = {
			callType: helpNeeded,
			callDirection: callDirection,
			callOutcome: callOutcomeValues,
			callDateTime: new Date(),
			callHandler: user.name
		}

		try {
			let helpRequestGateway = new HelpRequestGateway();
			let helpRequestId = await helpRequestGateway.postHelpRequest(residentId, helpRequestObject);

			if(callMade) {
				let helpRequestCallGateway = new HelpRequestCallGateway()
				let helpRequestCallId = await helpRequestCallGateway.postHelpRequestCall(helpRequestId, callRequestObject)
			}
			if (caseNote && caseNote != "") {
				const caseNotesGateway = new CaseNotesGateway();
				const caseNoteObject = {
						caseNote,
						author: user.name,
						noteDate: new Date().toGMTString(),
						helpNeeded: helpNeeded
				};      
				await caseNotesGateway.createCaseNote(helpRequestId, residentId, caseNoteObject);
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