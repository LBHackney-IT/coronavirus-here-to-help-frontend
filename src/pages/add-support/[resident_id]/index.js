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
                <a href="#" className="govuk-back-link">Back</a>
            </Link>
				<div className="govuk-grid-row">
					<div className="govuk-grid-column-one-quarter-from-desktop sticky-magic">
						<KeyInformation resident={resident}/>
					</div>

					<div className="govuk-grid-column-three-quarters-from-desktop">
						<h1
							className="govuk-heading-xl"
							style={{ marginTop: "0px", marginBottom: "40px" }}
						>
							Name Surname
						</h1>

						<form action="/oneresident" method="post">
							<div className="govuk-grid-row">
								<div className="govuk-grid-column-one-half">
									<div className="govuk-form-group lbh-form-group">
										<fieldset className="govuk-fieldset">
											<legend className="govuk-fieldset__legend">
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
							<div className="govuk-grid-row">
								<div className="govuk-grid-column-one-half">
									<div className="govuk-form-group lbh-form-group">
										<fieldset className="govuk-fieldset">
											<legend className="govuk-fieldset__legend">
												Did you make a call?
											</legend>
											<br />
											<div
												className="govuk-radios  lbh-radios govuk-radios--conditional"
												data-module="govuk-radios"
											>
												<div className="govuk-radios__item">
													<input
														className="govuk-radios__input"
														id="CallMade"
														name="CallMade"
														type="radio"
														value="yes"
														aria-controls="conditional-CallMade"
														aria-expanded="false"
													/>
													<label
														className="govuk-label govuk-radios__label"
														htmlFor="CallMade"
													>
														Yes
													</label>
												</div>
												<div
													className="govuk-radios__conditional govuk-radios__conditional--hidden"
													id="conditional-CallMade"
												>
													<div className="govuk-form-group lbh-form-group">
														<fieldset className="govuk-fieldset">
															<legend className="govuk-fieldset__legend">
																What was the
																outcome of the
																call?
															</legend>
															<div
																className="govuk-radios govuk-radios--inline lbh-radios govuk-radios--conditional"
																data-module="govuk-radios"
															>
																<div className="govuk-radios__item">
																	<input
																		className="govuk-radios__input"
																		id="CallDetail"
																		name="CallDetail"
																		type="radio"
																		value="spoke_to_resident"
																		aria-controls="conditional-CallDetail"
																		aria-expanded="false"
																	/>
																	<label
																		className="govuk-label govuk-radios__label"
																		htmlFor="CallDetail"
																	>
																		Spoke to
																		a
																		resident
																	</label>
																</div>
																<div
																	className="govuk-radios__conditional govuk-radios__conditional--hidden"
																	id="conditional-CallDetail"
																>
																	<div className="govuk-grid-row">
																		<div className="display-spoke-to-resident">
																			<div className="govuk-form-group lbh-form-group">
																				<span
																					id="CallOutcome-hint"
																					className="govuk-hint  lbh-hint"
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
																			<div className="display-call-attempted"></div>
																		</div>
																	</div>
																</div>
																<div className="govuk-radios__item">
																	<input
																		className="govuk-radios__input"
																		id="CallDetail-2"
																		name="CallDetail"
																		type="radio"
																		value="call_attempted"
																		aria-controls="conditional-CallDetail-2"
																		aria-expanded="false"
																	/>
																	<label
																		className="govuk-label govuk-radios__label"
																		htmlFor="CallDetail-2"
																	>
																		Call
																		attempted/no
																		answer
																	</label>
																</div>
																<div
																	className="govuk-radios__conditional govuk-radios__conditional--hidden"
																	id="conditional-CallDetail-2"
																>
																	<div className="display-call-attempted">
																		<div className="govuk-form-group lbh-form-group">
																			<span
																				id="CallOutcome-hint"
																				className="govuk-hint  lbh-hint"
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
													<div className="govuk-form-group lbh-form-group">
														<fieldset className="govuk-fieldset">
															<legend className="govuk-fieldset__legend">
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
													<div className="govuk-form-group lbh-form-group">
														<fieldset className="govuk-fieldset">
															<legend className="govuk-fieldset__legend">
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
												<div className="govuk-radios__item">
													<input
														className="govuk-radios__input"
														id="CallMade-2"
														name="CallMade"
														type="radio"
														value="no"
													/>
													<label
														className="govuk-label govuk-radios__label"
														htmlFor="CallMade-2"
													>
														No
													</label>
												</div>
											</div>
										</fieldset>
									</div>
								</div>
							</div>
							<hr className="govuk-section-break govuk-section-break--m govuk-section-break--visible" />
							
								
						
										<h2 className="govuk-heading-l">
						
												Resident Bio
									
										</h2>
									
									<div
										id="default-example-content-1"
										className="govuk-accordion__section-content"
										aria-labelledby="default-example-heading-1"
									>
										<div className="govuk-grid-row">
											<div className="govuk-grid-column-one-half">
												<fieldset className="govuk-fieldset lbh-fieldset">
													<legend className="govuk-fieldset__legend">
														First name
													</legend>
													<br />
												</fieldset>
												<div className="govuk-form-group lbh-form-group">
													<input
														className="govuk-input  lbh-input"
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
											<div className="govuk-grid-column-one-half">
												<fieldset className="govuk-fieldset lbh-fieldset">
													<legend
														className="govuk-fieldset__legend"
														style={{
															marginBottom:
																"30px",
														}}
													>
														Last name
													</legend>
												</fieldset>
												<div className="govuk-form-group lbh-form-group">
													<input
														className="govuk-input  lbh-input"
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
										<div className="govuk-grid-row">
											<div className="govuk-grid-column-one-half">
												<h3 className="lbh-heading-h3">
													Contact telephone
												</h3>
												<br />
												<div className="govuk-form-group lbh-form-group">
													<input
														className="govuk-input  lbh-input"
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
											<div className="govuk-grid-column-one-half">
												<h3 className="lbh-heading-h3">
													Contact mobile (Optional)
												</h3>
												<br />
												<div className="govuk-form-group lbh-form-group">
													<input
														className="govuk-input  lbh-input"
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
										<div className="govuk-grid-row">
											<div className="govuk-grid-column-one-half">
												<h3 className="lbh-heading-h3">
													Email address (Optional)
												</h3>
												<br />
												<div className="govuk-form-group lbh-form-group">
													<input
														className="govuk-input  lbh-input"
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
											<div className="govuk-grid-column-one-half"></div>
										</div>
										<h3 className="lbh-heading-h3">
											Date of birth
										</h3>
										<div className="govuk-form-group lbh-form-group">
											<div className="govuk-date-input  lbh-date-input">
												<div className="govuk-date-input__item">
													<div className="govuk-form-group">
														<label
															className="govuk-label govuk-date-input__label"
															htmlFor="DobDay"
														>
															Day
														</label>
														<input
															className="govuk-input govuk-date-input__input govuk-input--width-2 "
															id="DobDay"
															name="DobDay"
															type="text"
															pattern="[0-9]*"
															inputMode="numeric"
														/>
													</div>
												</div>
												<div className="govuk-date-input__item">
													<div className="govuk-form-group">
														<label
															className="govuk-label govuk-date-input__label"
															htmlFor="DobMonth"
														>
															Month
														</label>
														<input
															className="govuk-input govuk-date-input__input govuk-input--width-2 "
															id="DobMonth"
															name="DobMonth"
															type="text"
															pattern="[0-9]*"
															inputMode="numeric"
														/>
													</div>
												</div>
												<div className="govuk-date-input__item">
													<div className="govuk-form-group">
														<label
															className="govuk-label govuk-date-input__label"
															htmlFor="DobYear"
														>
															Year
														</label>
														<input
															className="govuk-input govuk-date-input__input govuk-input--width-4 "
															id="DobYear"
															name="DobYear"
															type="text"
															pattern="[0-9]*"
															inputMode="numeric"
														/>
													</div>
												</div>
											</div>
											<br />
										</div>
										<hr className="govuk-section-break govuk-section-break--m govuk-section-break--visible" />
										
							</div>
							<hr className="govuk-section-break govuk-section-break--m govuk-section-break" />
							<h2 className="govuk-heading-l">Case notes:</h2>
							<h3 className="govuk-heading-m">
								Add a new case note (optional):
							</h3>
							<div className="govuk-form-group">
								<span
									id="NewCaseNote-hint"
									className="govuk-hint  lbh-hint"
								></span>
								<textarea
									className="govuk-textarea  lbh-textarea"
									id="NewCaseNote"
									name="NewCaseNote"
									rows="5"
									aria-describedby="NewCaseNote-hint"
								></textarea>
							</div>
							<h3 className="govuk-heading-m">Case note history:</h3>
							<input type="hidden" name="CaseNotes" value="" />
							<br />
							<p className="lbh-body-m"></p>
							<h3 className="govuk-heading-m">
								Call attempts history:
							</h3>
							<br />
							<hr className="govuk-section-break govuk-section-break--m govuk-section-break--visible" />
							<div className="govuk-grid-row" id="btn-bottom-panel">
								<div className="govuk-grid-column-one-half">
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