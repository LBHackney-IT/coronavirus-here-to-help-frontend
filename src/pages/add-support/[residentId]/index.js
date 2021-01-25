import React, { useEffect, useState } from "react";
import Layout from "../../../components/layout";
import { Checkbox, RadioButton, Button } from "../../../components/Form";
import KeyInformation from "../../../components/KeyInformation/KeyInformation";
import CaseNotes from "../../../components/CaseNotes/CaseNotes";
import Link from "next/link";
import { ResidentGateway } from '../../../gateways/resident';
import { HelpRequestGateway } from '../../../gateways/help-request';


export default function addSupportPage({residentId,resident}) {
	const [callMade, setCallMade] = useState(false);
	const [callOutcome, setCallOutcome] = useState("");
	const [followUpRequired, setFollowupRequired] = useState("")
	const [helpNeeded, setHelpNeeded] = useState("")
	const [CallDirection, setCallDirection] = useState("")
	const [callOutcomeValues, setCallOutcomeValues] = useState([])

	const spokeToResidentCallOutcomes = [
		"Callback complete",
		"Refused to engage",
		"Call rescheduled",
	];
	const noAnswerCallOutcomes = [
		"Voicemail left",
		"Wrong number",
		"No answer machine",
	];
	const callTypes = [
		"Contact Tracing",
		"CEV",
		"Welfare Call",
		"Help Request",
	];
	const followupRequired = [
		"Yes", 
		"No"
	];
	const whoMadeInitialContact = [
		"I called the resident",
		"The resident called me",
	];
	const callBackFunction = value => {
		if( value == "Yes" || value == "No"){
			setFollowupRequired(value)
		}
		if(callTypes.includes(value)){
			setHelpNeeded(value)
		}
	
	}

	const CallDirectionFunction = value => {
		if(value == "I called the resident"){
			setCallDirection("Outbound")
		}
		if(value == "The resident called me"){
			setCallDirection("Inbound")
		}
		
	}
	const updateCallMadeAndCallOutcomeValues = async value => {
		setCallOutcome(value)
		setCallOutcomeValues([])
	}

	const onCheckboxChangeUpdate = (value) => {
		// console.log("call outcome values", callOutcomeValues)
		// console.log(value)
		if(callOutcomeValues.includes(value)) {
			let newCallOutcomesValues = callOutcomeValues.filter(callOutcomeValue => callOutcomeValue != value)
			// console.log(`${newCallOutcomesValues}`)
			// console.log(newCallOutcomesValues)
			setCallOutcomeValues(newCallOutcomesValues)
		}
		else{
			const newCallOutcomesValues = callOutcomeValues.concat(value)
			// console.log(`${newCallOutcomesValues}`)
			setCallOutcomeValues(newCallOutcomesValues)
		}
	}
	 console.log(callOutcomeValues)
	// console.log(CallDirection)

	const handleUpdate = async (e) => {

		let callbackRequired = (followUpRequired == "Yes") ? true : false
		let initialCallbackCompleted = (followUpRequired == "Yes") ? false : true
		console.log(helpNeeded)
		let helpRequestObject = {
			ResidentId:residentId,
			CallbackRequired: callbackRequired,
			InitialCallbackCompleted: initialCallbackCompleted,
			DateTimeRecorded: new Date(),
			HelpNeeded: helpNeeded}

		
		let callRequestObject = {
			HelpRequestId: "help request response",
			CallType: helpNeeded,
			CallDirection: CallDirection,
			CallOutcome: "call outcomes",
			CallDateTime: new Date(),
			CallHandler: "auth - need to figure out"
		}
							// {
		// 	HelpRequestId: "help request response"
    //   CallType: "what was the initial purpuse of the call"
    //   CallDirection: "who made thew call today"
    //   CallOutcome: "call outcomes"
    //   CallDateTime: "set"
		// 	CallHandler: "auth"
		// }



		// //create help request
		// const gateway = new HelpRequestGateway();
    // // await gateway.po(resident.id, request_body);
	}
	const backHref = `/helpcase-profile/${residentId}`
	return (
		<Layout>
			<div>
				<Link href= {backHref}>
					<a href="#" class="govuk-back-link">Back</a>
				</Link>
				<div class="govuk-grid-row">
					<div class="govuk-grid-column-one-quarter-from-desktop sticky-magic">
						<KeyInformation resident={resident}/>
					</div>

					<div class="govuk-grid-column-three-quarters-from-desktop">
						<h1 class="govuk-heading-xl" style={{ marginTop: "0px", marginBottom: "40px" }}> {resident.firstName} {resident.lastName}
						</h1>
						<form>
							<div>
								<div class="govuk-grid-column">
									<div class="govuk-form-group lbh-form-group">
										<fieldset class="govuk-fieldset">
											<legend class="govuk-fieldset__legend mandatoryQuestion"> Call type required</legend>
											<br />
											<RadioButton radioButtonItems={callTypes} name="HelpNeeded" onSelectOption = {callBackFunction} />
										</fieldset>
									</div>
								</div>
							</div>
							<div>
								<div class="govuk-grid-column">
									<div class="govuk-form-group lbh-form-group">
										<fieldset class="govuk-fieldset">
											<legend class="govuk-fieldset__legend mandatoryQuestion"> Do you need to log new call details? </legend>
											<br />
											<div class="govuk-radios  lbh-radios govuk-radios--conditional" data-module="govuk-radios">
												<div class="govuk-radios__item">
													<input
														class="govuk-radios__input"
														id="CallMade"
														name="CallMade"
														type="radio"
														value="yes"
														onChange = { () => { setCallMade(true)}}
														aria-controls="conditional-CallMade"
														aria-expanded="false"
													/>
													<label class="govuk-label govuk-radios__label" for="CallMade"> Yes </label>
												</div>
												{callMade &&
													<div class="govuk-radios__conditional govuk-radios__conditional--hidden" id="conditional-CallMade">
														<div class="govuk-form-group lbh-form-group">
															<fieldset class="govuk-fieldset">
																<legend class="govuk-fieldset__legend mandatoryQuestion">Did you speak to a resident?</legend>
																<div class="govuk-radios govuk-radios--inline lbh-radios govuk-radios--conditional" data-module="govuk-radios">
																	<div class="govuk-radios__item">
																		<input
																			class="govuk-radios__input"
																			id="CallDetail"
																			name="CallDetail"
																			type="radio"
																			value="spoke_to_resident"
																			onChange = {() => {updateCallMadeAndCallOutcomeValues("spoke to resident")}}
																			aria-controls="conditional-CallDetail"
																			aria-expanded="false"
																		/>
																		<label class="govuk-label govuk-radios__label" for="CallDetail">Yes - spoke to resident</label>
																	</div>
																	{callOutcome =="spoke to resident" && 
																		<div class="govuk-radios__conditional govuk-radios__conditional--hidden" id="conditional-CallDetail">
																			<div>
																				<div class="display-spoke-to-resident">
																					<div class="govuk-form-group lbh-form-group">
																						<span id="CallOutcome-hint" class="govuk-hint  lbh-hint">Select a call outcome</span>
																						{spokeToResidentCallOutcomes.map((spokeToResidentCallOutcome) => {
																								return (
																									<Checkbox 
																										id={spokeToResidentCallOutcome} 
																										name="spokeToResidentCallOutcome"
																										type="checkbox"
																										value={spokeToResidentCallOutcome}
																										label={spokeToResidentCallOutcome}
																										aria-describedby="CallOutcome-hint"
																										onCheckboxChange={onCheckboxChangeUpdate}>
																									</Checkbox>
																								);
																						})}
																					</div>
																					<div class="display-call-attempted"></div>
																				</div>
																			</div>
																		</div>
																	}
																	<div class="govuk-radios__item">
																		<input
																			class="govuk-radios__input"
																			id="CallDetail-2"
																			name="CallDetail"
																			type="radio"
																			value="call_attempted"
																			onChange= { () => {updateCallMadeAndCallOutcomeValues("call attempted")}}
																			aria-controls="conditional-CallDetail-2"
																			aria-expanded="false"
																		/>
																		<label class="govuk-label govuk-radios__label" for="CallDetail-2">
																			No - call attempted
																		</label>
																	</div>
																	{callOutcome  =="call attempted" && 
																		<div class="govuk-radios__conditional govuk-radios__conditional--hidden" id="conditional-CallDetail-2">
																			<div class="display-call-attempted">
																				<div class="govuk-form-group lbh-form-group">
																					<span id="CallOutcome-hint" class="govuk-hint  lbh-hint"> Select a call outcome </span>
																					{noAnswerCallOutcomes.map((noAnswerCallOutcome) => {
																							return (
																								<Checkbox 
																								id={noAnswerCallOutcome} n
																								ame="noAnswerCallOutcome" 
																								type="checkbox" v
																								value={noAnswerCallOutcome} 
																								label={noAnswerCallOutcome}
																								onCheckboxChange={onCheckboxChangeUpdate}
																								aria-describedby="CallOutcome-hint">

																								</Checkbox>
																							);
																						})}
																				</div>
																			</div>
																	</div>}
																</div>
															</fieldset>
														</div>
														<div class="govuk-form-group lbh-form-group">
															<fieldset class="govuk-fieldset">
																<legend class="govuk-fieldset__legend mandatoryQuestion">
																	What was the initial purpose of the call?
																</legend>
																<RadioButton radioButtonItems={callTypes} name="SupportType"/>
															</fieldset>
														</div>
														<div class="govuk-form-group lbh-form-group">
														<fieldset class="govuk-fieldset">
															<legend class="govuk-fieldset__legend mandatoryQuestion"> Who made the call today? </legend>
															<RadioButton radioButtonItems={whoMadeInitialContact} name="InitialContact" onSelectOption={CallDirectionFunction} />
														</fieldset>
													</div>
													</div>
												}
												<div class="govuk-radios__item">
													<input
														class="govuk-radios__input"
														id="CallMade-2"
														name="CallMade"
														type="radio"
														value="no"
														onChange = { () => setCallMade(false)}
													/>
													<label class="govuk-label govuk-radios__label" for="CallMade-2">No</label>
												</div>
											</div>
										</fieldset>
									</div>
								</div>
							</div>
							
							<hr class="govuk-section-break govuk-section-break--m govuk-section-break" />
							<h2 class="govuk-heading-l">Case notes:</h2>
							<h3 class="govuk-heading-m">
								Add a new case note (optional):
							</h3>
							<div class="govuk-form-group">
								<span id="NewCaseNote-hint" class="govuk-hint  lbh-hint"></span>
								<textarea
									class="govuk-textarea  lbh-textarea"
									id="NewCaseNote"
									name="NewCaseNote"
									rows="5"
									aria-describedby="NewCaseNote-hint">
								</textarea>
							</div>
							<br></br>
							<div class="govuk-grid-column">
									<div class="govuk-form-group lbh-form-group">
										<fieldset class="govuk-fieldset">
											<legend class="govuk-fieldset__legend mandatoryQuestion">Follow-up required?</legend>
											<br />
											<RadioButton radioButtonItems={followupRequired} name="FollowUpRequired" optionalClass = "govuk-radios--inline" onSelectOption = {callBackFunction}/>
										</fieldset>
									</div>
								</div>
							<div id="btn-bottom-panel">
								<div class="govuk-grid-column">
								<Link href={backHref}>
									<Button text="Update" addClass="govuk-!-margin-right-1" onClick={() =>handleUpdate()}/>
								</Link>
								<Link href={backHref}>
									<Button text="Cancel" addClass="govuk-button--secondary"/>
								</Link>
								</div>
							</div>
						</form>
						<CaseNotes />
					</div>
				</div>
			</div>
		</Layout>
	);
}

addSupportPage.getInitialProps = async ({ query: { residentId }, req, res }) => {
    try {
      console.log(`HEEREEEE ${residentId}`)
        const gateway = new ResidentGateway();
        const resident = await gateway.getResident(residentId);

        return {
            residentId,
            resident
        };
    } catch (err) {
        console.log(`Error getting resident props with help request ID ${residentId}: ${err}`);
    }
};