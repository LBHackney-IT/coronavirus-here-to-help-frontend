import React from "react";
import Layout from "../../../components/layout";
import { Checkbox, RadioButton, Button } from "../../../components/Form";
import KeyInformation from "../../../components/KeyInformation/KeyInformation";
import CaseNotes from "../../../components/CaseNotes/CaseNotes";
import Link from "next/link";
import { ResidentGateway } from '../../../gateways/resident';

export default function addSupportPage({resident}) {
	const spokeToResidentCallOutcomes = [
		"Callback complete",
		"Refused to engage",
		"Follow up requested",
		"Call rescheduled",
	];
	const noAnswerCallOutcomes = [
		"Voicemail left",
		"Wrong number",
		"No answer maching",
		"Close case",
	];
	const callTypes = [
		"Contact Tracing",
		"Shielding",
		"Welfare Call",
		"Help Request",
	];
	const whoMadeInitialContact = [
		"I contacted the resident",
		"The resident contacted me",
	];
	const numberOfChildrenUnder18 = ["0", "1", "2", "3", "4", "5 or more"];

	return (
		<Layout>
			<div>
			<Link href="/">
                <a href="#" class="govuk-back-link">Back</a>
            </Link>
				<div class="govuk-grid-row">
					<div class="govuk-grid-column-one-quarter-from-desktop sticky-magic">
						<KeyInformation resident={resident}/>
					</div>

					<div class="govuk-grid-column-three-quarters-from-desktop">
						<h1
							class="govuk-heading-xl"
							style={{ marginTop: "0px", marginBottom: "40px" }}
						>
							Name Surname
						</h1>

						<form action="/oneresident" method="post">
							<div class="govuk-grid-row">
								<div class="govuk-grid-column-one-half">
									<div class="govuk-form-group lbh-form-group">
										<fieldset class="govuk-fieldset">
											<legend class="govuk-fieldset__legend">
												Call type required
											</legend>
											<br />

											<RadioButton
												radioButtonItems={callTypes}
												name="HelpNeeded"
											/>
										</fieldset>
									</div>
								</div>
							</div>
							<div class="govuk-grid-row">
								<div class="govuk-grid-column-one-half">
									<div class="govuk-form-group lbh-form-group">
										<fieldset class="govuk-fieldset">
											<legend class="govuk-fieldset__legend">
												Did you make a call?
											</legend>
											<br />
											<div
												class="govuk-radios  lbh-radios govuk-radios--conditional"
												data-module="govuk-radios"
											>
												<div class="govuk-radios__item">
													<input
														class="govuk-radios__input"
														id="CallMade"
														name="CallMade"
														type="radio"
														value="yes"
														aria-controls="conditional-CallMade"
														aria-expanded="false"
													/>
													<label
														class="govuk-label govuk-radios__label"
														for="CallMade"
													>
														Yes
													</label>
												</div>
												<div
													class="govuk-radios__conditional govuk-radios__conditional--hidden"
													id="conditional-CallMade"
												>
													<div class="govuk-form-group lbh-form-group">
														<fieldset class="govuk-fieldset">
															<legend class="govuk-fieldset__legend">
																What was the
																outcome of the
																call?
															</legend>
															<div
																class="govuk-radios govuk-radios--inline lbh-radios govuk-radios--conditional"
																data-module="govuk-radios"
															>
																<div class="govuk-radios__item">
																	<input
																		class="govuk-radios__input"
																		id="CallDetail"
																		name="CallDetail"
																		type="radio"
																		value="spoke_to_resident"
																		aria-controls="conditional-CallDetail"
																		aria-expanded="false"
																	/>
																	<label
																		class="govuk-label govuk-radios__label"
																		for="CallDetail"
																	>
																		Spoke to
																		a
																		resident
																	</label>
																</div>
																<div
																	class="govuk-radios__conditional govuk-radios__conditional--hidden"
																	id="conditional-CallDetail"
																>
																	<div class="govuk-grid-row">
																		<div class="display-spoke-to-resident">
																			<div class="govuk-form-group lbh-form-group">
																				<span
																					id="CallOutcome-hint"
																					class="govuk-hint  lbh-hint"
																				>
																					Select
																					a
																					call
																					outcome
																				</span>
																				{spokeToResidentCallOutcomes.map(
																					(
																						spokeToResidentCallOutcome
																					) => {
																						return (
																							<Checkbox
																								id={
																									spokeToResidentCallOutcome
																								}
																								name="spokeToResidentCallOutcome"
																								type="checkbox"
																								value={
																									spokeToResidentCallOutcome
																								}
																								label={
																									spokeToResidentCallOutcome
																								}
																								aria-describedby="CallOutcome-hint"
																							></Checkbox>
																						);
																					}
																				)}
																			</div>
																			<div class="display-call-attempted"></div>
																		</div>
																	</div>
																</div>
																<div class="govuk-radios__item">
																	<input
																		class="govuk-radios__input"
																		id="CallDetail-2"
																		name="CallDetail"
																		type="radio"
																		value="call_attempted"
																		aria-controls="conditional-CallDetail-2"
																		aria-expanded="false"
																	/>
																	<label
																		class="govuk-label govuk-radios__label"
																		for="CallDetail-2"
																	>
																		Call
																		attempted/no
																		answer
																	</label>
																</div>
																<div
																	class="govuk-radios__conditional govuk-radios__conditional--hidden"
																	id="conditional-CallDetail-2"
																>
																	<div class="display-call-attempted">
																		<div class="govuk-form-group lbh-form-group">
																			<span
																				id="CallOutcome-hint"
																				class="govuk-hint  lbh-hint"
																			>
																				Select
																				a
																				call
																				outcome
																			</span>
																			{noAnswerCallOutcomes.map(
																				(
																					noAnswerCallOutcome
																				) => {
																					return (
																						<Checkbox
																							id={
																								noAnswerCallOutcome
																							}
																							name="noAnswerCallOutcome"
																							type="checkbox"
																							value={
																								noAnswerCallOutcome
																							}
																							label={
																								noAnswerCallOutcome
																							}
																							aria-describedby="CallOutcome-hint"
																						></Checkbox>
																					);
																				}
																			)}
																		</div>
																	</div>
																</div>
															</div>
														</fieldset>
													</div>
													<div class="govuk-form-group lbh-form-group">
														<fieldset class="govuk-fieldset">
															<legend class="govuk-fieldset__legend">
																What type of
																help was given
																in the call
															</legend>
															<RadioButton
																radioButtonItems={
																	callTypes
																}
																name="SupportType"
															/>
														</fieldset>
													</div>
													<div class="govuk-form-group lbh-form-group">
														<fieldset class="govuk-fieldset">
															<legend class="govuk-fieldset__legend">
																Who made the
																initial contact?
															</legend>
															<RadioButton
																radioButtonItems={
																	whoMadeInitialContact
																}
																name="InitialContact"
															/>
														</fieldset>
													</div>
												</div>
												<div class="govuk-radios__item">
													<input
														class="govuk-radios__input"
														id="CallMade-2"
														name="CallMade"
														type="radio"
														value="no"
													/>
													<label
														class="govuk-label govuk-radios__label"
														for="CallMade-2"
													>
														No
													</label>
												</div>
											</div>
										</fieldset>
									</div>
								</div>
							</div>
							<hr class="govuk-section-break govuk-section-break--m govuk-section-break--visible" />
							
								
						
										<h2 class="govuk-heading-l">
						
												Resident Bio
									
										</h2>
									
									<div
										id="default-example-content-1"
										class="govuk-accordion__section-content"
										aria-labelledby="default-example-heading-1"
									>
										<div class="govuk-grid-row">
											<div class="govuk-grid-column-one-half">
												<fieldset class="govuk-fieldset lbh-fieldset">
													<legend class="govuk-fieldset__legend">
														First name
													</legend>
													<br />
												</fieldset>
												<div class="govuk-form-group lbh-form-group">
													<input
														class="govuk-input  lbh-input"
														id="FirstName"
														name="FirstName"
														type="text"
														style={{
															marginBottom:
																"20px",
														}}
													/>
												</div>
											</div>
											<div class="govuk-grid-column-one-half">
												<fieldset class="govuk-fieldset lbh-fieldset">
													<legend
														class="govuk-fieldset__legend"
														style={{
															marginBottom:
																"30px",
														}}
													>
														Last name
													</legend>
												</fieldset>
												<div class="govuk-form-group lbh-form-group">
													<input
														class="govuk-input  lbh-input"
														id="LastName"
														name="LastName"
														type="text"
														style={{
															marginBottom:
																"20px",
														}}
													/>
												</div>
											</div>
										</div>
										<div class="govuk-grid-row">
											<div class="govuk-grid-column-one-half">
												<h3 class="lbh-heading-h3">
													Contact telephone
												</h3>
												<br />
												<div class="govuk-form-group lbh-form-group">
													<input
														class="govuk-input  lbh-input"
														id="ContactTelephoneNumber"
														name="ContactTelephoneNumber"
														type="tel"
														style={{
															marginBottom:
																"20px",
														}}
													/>
												</div>
											</div>
											<div class="govuk-grid-column-one-half">
												<h3 class="lbh-heading-h3">
													Contact mobile (Optional)
												</h3>
												<br />
												<div class="govuk-form-group lbh-form-group">
													<input
														class="govuk-input  lbh-input"
														id="ContactMobileNumber"
														name="ContactMobileNumber"
														type="tel"
														style={{
															marginBottom:
																"20px",
														}}
													/>
												</div>
											</div>
										</div>
										<div class="govuk-grid-row">
											<div class="govuk-grid-column-one-half">
												<h3 class="lbh-heading-h3">
													Email address (Optional)
												</h3>
												<br />
												<div class="govuk-form-group lbh-form-group">
													<input
														class="govuk-input  lbh-input"
														id="EmailAddress"
														name="EmailAddress"
														type="text"
														style={{
															marginBottom:
																"20px",
														}}
													/>
												</div>
											</div>
											<div class="govuk-grid-column-one-half"></div>
										</div>
										<h3 class="lbh-heading-h3">
											Date of birth
										</h3>
										<div class="govuk-form-group lbh-form-group">
											<div class="govuk-date-input  lbh-date-input">
												<div class="govuk-date-input__item">
													<div class="govuk-form-group">
														<label
															class="govuk-label govuk-date-input__label"
															for="DobDay"
														>
															Day
														</label>
														<input
															class="govuk-input govuk-date-input__input govuk-input--width-2 "
															id="DobDay"
															name="DobDay"
															type="text"
															pattern="[0-9]*"
															inputmode="numeric"
														/>
													</div>
												</div>
												<div class="govuk-date-input__item">
													<div class="govuk-form-group">
														<label
															class="govuk-label govuk-date-input__label"
															for="DobMonth"
														>
															Month
														</label>
														<input
															class="govuk-input govuk-date-input__input govuk-input--width-2 "
															id="DobMonth"
															name="DobMonth"
															type="text"
															pattern="[0-9]*"
															inputmode="numeric"
														/>
													</div>
												</div>
												<div class="govuk-date-input__item">
													<div class="govuk-form-group">
														<label
															class="govuk-label govuk-date-input__label"
															for="DobYear"
														>
															Year
														</label>
														<input
															class="govuk-input govuk-date-input__input govuk-input--width-4 "
															id="DobYear"
															name="DobYear"
															type="text"
															pattern="[0-9]*"
															inputmode="numeric"
														/>
													</div>
												</div>
											</div>
											<br />
										</div>
										<hr class="govuk-section-break govuk-section-break--m govuk-section-break--visible" />
										
							</div>
							<hr class="govuk-section-break govuk-section-break--m govuk-section-break" />
							<h2 class="govuk-heading-l">Case notes:</h2>
							<h3 class="govuk-heading-m">
								Add a new case note (optional):
							</h3>
							<div class="govuk-form-group">
								<span
									id="NewCaseNote-hint"
									class="govuk-hint  lbh-hint"
								></span>
								<textarea
									class="govuk-textarea  lbh-textarea"
									id="NewCaseNote"
									name="NewCaseNote"
									rows="5"
									aria-describedby="NewCaseNote-hint"
								></textarea>
							</div>
							<h3 class="govuk-heading-m">Case note history:</h3>
							<input type="hidden" name="CaseNotes" value="" />
							<br />
							<p class="lbh-body-m"></p>
							<h3 class="govuk-heading-m">
								Call attempts history:
							</h3>
							<br />
							<hr class="govuk-section-break govuk-section-break--m govuk-section-break--visible" />
							<div class="govuk-grid-row" id="btn-bottom-panel">
								<div class="govuk-grid-column-one-half">
								<Link href="/helpcase-profile/1">
									<Button text="Update" onClick={() => alert("Updated")} addClass="govuk-!-margin-right-1"/>
								</Link>
								<Link href="/helpcase-profile/1">
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

addSupportPage.getInitialProps = async ({ query: { resident_id }, req, res }) => {
    try {
        const gateway = new ResidentGateway();
        const resident = await gateway.getResident(resident_id);

        return {
            resident_id,
            resident
        };
    } catch (err) {
        console.log(`Error getting resident props with help request ID ${resident_id}: ${err}`);
    }
};