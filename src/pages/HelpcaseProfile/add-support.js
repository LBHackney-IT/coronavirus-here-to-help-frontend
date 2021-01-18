import React from "react";
import Layout from "../../components/layout";
import { Checkbox } from "../../components/Form";

export default function addSupportPage() {
    const spokeToResidentCallOutcomes = ["Callback complete", "Refused to engage", "Follow up requested", "Call rescheduled"]; 
    const noAnswerCallOutcomes = ["Voicemail left", "Wrong number", "No answer maching", "Close case"]; 

	return (
		<Layout>
			<form action="/oneresident" method="post">
				<div class="govuk-grid-row">
					<div class="govuk-grid-column-one-half">
						<div class="govuk-form-group lbh-form-group">
							<fieldset class="govuk-fieldset">
								<legend class="govuk-fieldset__legend">
									Call type required
								</legend>
								<br />
								<div class="govuk-radios govuk-radios--inline lbh-radios">
									<div class="govuk-radios__item">
										<input
											class="govuk-radios__input"
											id="HelpNeeded"
											name="HelpNeeded"
											type="radio"
											value="Contact Tracing"
										/>
										<label
											class="govuk-label govuk-radios__label"
											for="HelpNeeded"
										>
											Contact Tracing
										</label>
									</div>
									<div class="govuk-radios__item">
										<input
											class="govuk-radios__input"
											id="HelpNeeded-2"
											name="HelpNeeded"
											type="radio"
											value="Shielding"
										/>
										<label
											class="govuk-label govuk-radios__label"
											for="HelpNeeded-2"
										>
											Shielding
										</label>
									</div>
									<div class="govuk-radios__item">
										<input
											class="govuk-radios__input"
											id="HelpNeeded-3"
											name="HelpNeeded"
											type="radio"
											value="Help Request"
										/>
										{/* <?=$_REQUEST['new']=='true'?" checked='checked' ":""?> */}
										<label
											class="govuk-label govuk-radios__label"
											for="HelpNeeded-3"
										>
											Help Request
										</label>
									</div>
									<div class="govuk-radios__item">
										<input
											class="govuk-radios__input"
											id="HelpNeeded-4"
											name="HelpNeeded"
											type="radio"
											value="Welfare Call"
										/>
										<label
											class="govuk-label govuk-radios__label"
											for="HelpNeeded-4"
										>
											Welfare Call
										</label>
									</div>
								</div>
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
													What was the outcome of the
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
															Spoke to a resident
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
																		Select a
																		call
																		outcome
																	</span>
                                                                    {
                                                                        spokeToResidentCallOutcomes.map((spokeToResidentCallOutcome) => {
                                                                            return (
                                                                                <Checkbox
																				id={spokeToResidentCallOutcome}
																				name="spokeToResidentCallOutcome"
																				type="checkbox"
																				value={spokeToResidentCallOutcome}
                                                                                label={spokeToResidentCallOutcome}
																				aria-describedby="CallOutcome-hint"
                                                                                >
                                                                                </Checkbox>
                                                                            );
                                                                        })
                                                                    }
																	
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
															Call attempted/no
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
																	Select a
																	call outcome
																</span>
                                                                {
                                                                        noAnswerCallOutcomes.map((noAnswerCallOutcome) => {
                                                                            return (
                                                                                <Checkbox
																				id={noAnswerCallOutcome}
																				name="noAnswerCallOutcome"
																				type="checkbox"
																				value={noAnswerCallOutcome}
                                                                                label={noAnswerCallOutcome}
																				aria-describedby="CallOutcome-hint"
                                                                                >
                                                                                </Checkbox>
                                                                            );
                                                                        })
                                                                    }
															</div>
														</div>
													</div>
												</div>
											</fieldset>
										</div>
										<div class="govuk-form-group lbh-form-group">
											<fieldset class="govuk-fieldset">
												<legend class="govuk-fieldset__legend">
													What type of help was given
													in the call
												</legend>
												<div class="govuk-radios  lbh-radios">
													<div class="govuk-radios__item">
														<input
															class="govuk-radios__input"
															id="CallType"
															name="CallType"
															type="radio"
															value="Contact Tracing"
														/>
														<label
															class="govuk-label govuk-radios__label"
															for="CallType"
														>
															Contact Tracing
														</label>
													</div>
													<div class="govuk-radios__item">
														<input
															class="govuk-radios__input"
															id="CallType-2"
															name="CallType"
															type="radio"
															value="Shielding"
														/>
														<label
															class="govuk-label govuk-radios__label"
															for="CallType-2"
														>
															Shielding
														</label>
													</div>
													<div class="govuk-radios__item">
														<input
															class="govuk-radios__input"
															id="CallType-3"
															name="CallType"
															type="radio"
															value="Welfare Call"
														/>
														<label
															class="govuk-label govuk-radios__label"
															for="CallType-3"
														>
															Welfare Call
														</label>
													</div>
													<div class="govuk-radios__item">
														<input
															class="govuk-radios__input"
															id="CallType-4"
															name="CallType"
															type="radio"
															value="Help Request"
														/>
														<label
															class="govuk-label govuk-radios__label"
															for="CallType-4"
														>
															Help Request
														</label>
													</div>
												</div>
											</fieldset>
										</div>
										<div class="govuk-form-group lbh-form-group">
											<fieldset class="govuk-fieldset">
												<legend class="govuk-fieldset__legend">
													Who made the initial
													contact?
												</legend>
												<div class="govuk-radios  lbh-radios">
													<div class="govuk-radios__item">
														<input
															class="govuk-radios__input"
															id="CallDirection"
															name="CallDirection"
															type="radio"
															value="outbound"
														/>
														<label
															class="govuk-label govuk-radios__label"
															for="CallDirection"
														>
															I contacted the
															resident
														</label>
													</div>
													<div class="govuk-radios__item">
														<input
															class="govuk-radios__input"
															id="CallDirection-2"
															name="CallDirection"
															type="radio"
															value="inbound"
														/>
														<label
															class="govuk-label govuk-radios__label"
															for="CallDirection-2"
														>
															The resident
															contacted me
														</label>
													</div>
												</div>
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
				<div
					class="govuk-accordion myClass lbh-accordion"
					data-module="govuk-accordion"
					id="default-example"
					data-attribute="value"
				>
					<div class="govuk-accordion__controls">
						<button
							type="button"
							class="govuk-accordion__open-all"
							aria-expanded="false"
						>
							Open all
							<span class="govuk-visually-hidden"> sections</span>
						</button>
					</div>
					<div class="govuk-accordion__section">
						<div
							class="govuk-accordion__section-header"
							id="resident-bio-heading"
						>
							<h5 class="govuk-accordion__section-heading">
								<button
									type="button"
									id="default-example-heading-1"
									aria-controls="default-example-content-1"
									class="govuk-accordion__section-button"
									aria-expanded="false"
								>
									Resident Bio
								</button>
								<span
									class="govuk-accordion__icon"
									aria-hidden="true"
								></span>
							</h5>
						</div>
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
											style={{marginBottom: "20px"}}
										/>
									</div>
								</div>
								<div class="govuk-grid-column-one-half">
									<fieldset class="govuk-fieldset lbh-fieldset">
										<legend
											class="govuk-fieldset__legend"
											style={{marginBottom: "30px"}}
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
											style={{marginBottom: "20px"}}
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
											style={{marginBottom: "20px"}}
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
											style={{marginBottom: "20px"}}
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
											style={{marginBottom: "20px"}}
										/>
									</div>
								</div>
								<div class="govuk-grid-column-one-half"></div>
							</div>
							<h3 class="lbh-heading-h3">Date of birth</h3>
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
							<hr />
							<div class="govuk-form-group lbh-form-group">
								<fieldset class="govuk-fieldset">
									<legend class="govuk-fieldset__legend">
										How many children under the age of 18
										are in your household?
									</legend>
									<br />
									<div class="govuk-radios govuk-radios--inline lbh-radios">
										<div class="govuk-radios__item">
											<input
												class="govuk-radios__input"
												id="NumberOfChildrenUnder18"
												name="NumberOfChildrenUnder18"
												type="radio"
												value="0"
											/>
											<label
												class="govuk-label govuk-radios__label"
												for="NumberOfChildrenUnder18"
											>
												0
											</label>
										</div>
										<div class="govuk-radios__item">
											<input
												class="govuk-radios__input"
												id="NumberOfChildrenUnder18-2"
												name="NumberOfChildrenUnder18"
												type="radio"
												value="1"
											/>
											<label
												class="govuk-label govuk-radios__label"
												for="NumberOfChildrenUnder18-2"
											>
												1
											</label>
										</div>
										<div class="govuk-radios__item">
											<input
												class="govuk-radios__input"
												id="NumberOfChildrenUnder18-3"
												name="NumberOfChildrenUnder18"
												type="radio"
												value="2"
											/>
											<label
												class="govuk-label govuk-radios__label"
												for="NumberOfChildrenUnder18-3"
											>
												2
											</label>
										</div>
										<div class="govuk-radios__item">
											<input
												class="govuk-radios__input"
												id="NumberOfChildrenUnder18-4"
												name="NumberOfChildrenUnder18"
												type="radio"
												value="3"
											/>
											<label
												class="govuk-label govuk-radios__label"
												for="NumberOfChildrenUnder18-4"
											>
												3
											</label>
										</div>
										<div class="govuk-radios__item">
											<input
												class="govuk-radios__input"
												id="NumberOfChildrenUnder18-5"
												name="NumberOfChildrenUnder18"
												type="radio"
												value="4"
											/>
											<label
												class="govuk-label govuk-radios__label"
												for="NumberOfChildrenUnder18-5"
											>
												4
											</label>
										</div>
										<div class="govuk-radios__item">
											<input
												class="govuk-radios__input"
												id="NumberOfChildrenUnder18-6"
												name="NumberOfChildrenUnder18"
												type="radio"
												value="5 or more"
											/>
											<label
												class="govuk-label govuk-radios__label"
												for="NumberOfChildrenUnder18-6"
											>
												5 or more
											</label>
										</div>
									</div>
								</fieldset>
							</div>
						</div>
					</div>
					<div class="govuk-accordion__section">
						<div class="govuk-accordion__section-header">
							<h5 class="govuk-accordion__section-heading">
								<button
									type="button"
									id="default-example-heading-2"
									aria-controls="default-example-content-2"
									class="govuk-accordion__section-button"
									aria-expanded="false"
								>
									Help needed
								</button>
								<span
									class="govuk-accordion__icon"
									aria-hidden="true"
								></span>
							</h5>
						</div>
						<div
							id="default-example-content-2"
							class="govuk-accordion__section-content"
							aria-labelledby="default-example-heading-2"
						>
							<div class="govuk-form-group lbh-form-group">
								<fieldset
									class="govuk-fieldset"
									aria-describedby="what_coronavirus_help-hint"
								>
									<legend class="govuk-fieldset__legend">
										What type of help do you need because of
										coronavirus?
									</legend>
									<span
										id="what_coronavirus_help-hint"
										class="govuk-hint  lbh-hint"
									>
										Select all that apply
									</span>
									<div
										class="govuk-checkboxes govuk-checkboxes--inline lbh-checkboxes"
										id="what_coronavirus_help"
									>
										<div class="govuk-checkboxes__item">
											<input
												class="govuk-checkboxes__input"
												id="what_coronavirus_help"
												name="what_coronavirus_help"
												type="checkbox"
												value="accessing food"
											/>
											<label
												class="govuk-label govuk-checkboxes__label"
												for="what_coronavirus_help"
											>
												Accessing food via voluntary
												sector
											</label>
										</div>
										<div class="govuk-checkboxes__item">
											<input
												class="govuk-checkboxes__input"
												id="what_coronavirus_help-2"
												name="what_coronavirus_help"
												type="checkbox"
												value="food via supermarket"
											/>
											<label
												class="govuk-label govuk-checkboxes__label"
												for="what_coronavirus_help-2"
											>
												Accessing food via priority
												supermarket delivery
											</label>
										</div>
										<div class="govuk-checkboxes__item">
											<input
												class="govuk-checkboxes__input"
												id="what_coronavirus_help-3"
												name="what_coronavirus_help"
												type="checkbox"
												value="nss form support"
											/>
											<label
												class="govuk-label govuk-checkboxes__label"
												for="what_coronavirus_help-3"
											>
												Support completing NSS form
											</label>
										</div>
										<div class="govuk-checkboxes__item">
											<input
												class="govuk-checkboxes__input"
												id="what_coronavirus_help-4"
												name="what_coronavirus_help"
												type="checkbox"
												value="shielding guidance"
											/>
											<label
												class="govuk-label govuk-checkboxes__label"
												for="what_coronavirus_help-4"
											>
												General guidance about Shielding
											</label>
										</div>
										<div class="govuk-checkboxes__item">
											<input
												class="govuk-checkboxes__input"
												id="what_coronavirus_help-5"
												name="what_coronavirus_help"
												type="checkbox"
												value="no needs"
											/>
											<label
												class="govuk-label govuk-checkboxes__label"
												for="what_coronavirus_help-5"
											>
												No needs identified
											</label>
										</div>
										<div class="govuk-checkboxes__item">
											<input
												class="govuk-checkboxes__input"
												id="what_coronavirus_help-6"
												name="what_coronavirus_help"
												type="checkbox"
												value="debt and money"
											/>
											<label
												class="govuk-label govuk-checkboxes__label"
												for="what_coronavirus_help-6"
											>
												Managing money or debts,
												including how to apply for
												benefits
											</label>
										</div>

										<div class="govuk-checkboxes__item">
											<input
												class="govuk-checkboxes__input"
												id="what_coronavirus_help-7"
												name="what_coronavirus_help"
												type="checkbox"
												value="health"
											/>
											<label
												class="govuk-label govuk-checkboxes__label"
												for="what_coronavirus_help-7"
											>
												Health, including Coronavirus
												testing
											</label>
										</div>

										<div class="govuk-checkboxes__item">
											<input
												class="govuk-checkboxes__input"
												id="what_coronavirus_help-8"
												name="what_coronavirus_help"
												type="checkbox"
												value="mental health"
											/>
											<label
												class="govuk-label govuk-checkboxes__label"
												for="what_coronavirus_help-8"
											>
												Mental health and wellbeing,
												including if you are feeling
												lonely or isolated
											</label>
										</div>

										<div class="govuk-checkboxes__item">
											<input
												class="govuk-checkboxes__input"
												id="what_coronavirus_help-9"
												name="what_coronavirus_help"
												type="checkbox"
												value="housing"
											/>
											<label
												class="govuk-label govuk-checkboxes__label"
												for="what_coronavirus_help-9"
											>
												Housing, including feeling
												unsafe where you live or help
												staying at home
											</label>
										</div>

										<div class="govuk-checkboxes__item">
											<input
												class="govuk-checkboxes__input"
												id="what_coronavirus_help-10"
												name="what_coronavirus_help"
												type="checkbox"
												value="technology support"
											/>
											<label
												class="govuk-label govuk-checkboxes__label"
												for="what_coronavirus_help-10"
											>
												Accessing the internet,
												including support to utilise
												technology
											</label>
										</div>

										<div class="govuk-checkboxes__item">
											<input
												class="govuk-checkboxes__input"
												id="what_coronavirus_help-11"
												name="what_coronavirus_help"
												type="checkbox"
												value="something else"
											/>
											<label
												class="govuk-label govuk-checkboxes__label"
												for="what_coronavirus_help-11"
											>
												Something else
											</label>
										</div>
									</div>
								</fieldset>
							</div>
						</div>
					</div>
					<div class="govuk-accordion__section">
						<div class="govuk-accordion__section-header">
							<h5 class="govuk-accordion__section-heading">
								<button
									type="button"
									id="default-example-heading-1"
									aria-controls="default-example-content-3"
									class="govuk-accordion__section-button"
									aria-expanded="false"
								>
									Support network
								</button>
								<span
									class="govuk-accordion__icon"
									aria-hidden="true"
								></span>
							</h5>
						</div>
						<div
							id="default-example-content-1"
							class="govuk-accordion__section-content"
							aria-labelledby="default-example-heading-1"
						>
							<div class="govuk-form-group lbh-form-group">
								<fieldset
									class="govuk-fieldset"
									aria-describedby="CurrentSupport-hint"
								>
									<legend class="govuk-fieldset__legend">
										Who is supporting you currently?
									</legend>
									<span
										id="CurrentSupport-hint"
										class="govuk-hint  lbh-hint"
									>
										Select all that apply
									</span>
									<div
										class="govuk-checkboxes  lbh-checkboxes"
										id="CurrentSupport"
									>
										<div class="govuk-checkboxes__item">
											<input
												class="govuk-checkboxes__input"
												id="CurrentSupport"
												name="CurrentSupport"
												type="checkbox"
												value="family"
											/>
											<label
												class="govuk-label govuk-checkboxes__label"
												for="CurrentSupport"
											>
												Family
											</label>
										</div>
										<div class="govuk-checkboxes__item">
											<input
												class="govuk-checkboxes__input"
												id="CurrentSupport-2"
												name="CurrentSupport"
												type="checkbox"
												value="friends"
											/>
											<label
												class="govuk-label govuk-checkboxes__label"
												for="CurrentSupport-2"
											>
												Friends
											</label>
										</div>
										<div class="govuk-checkboxes__item">
											<input
												class="govuk-checkboxes__input"
												id="CurrentSupport-3"
												name="CurrentSupport"
												type="checkbox"
												value="neighbours"
											/>
											<label
												class="govuk-label govuk-checkboxes__label"
												for="CurrentSupport-3"
											>
												Neighbours
											</label>
										</div>
										<div class="govuk-checkboxes__item">
											<input
												class="govuk-checkboxes__input"
												id="CurrentSupport-4"
												name="CurrentSupport"
												type="checkbox"
												value="volunteers"
											/>
											<label
												class="govuk-label govuk-checkboxes__label"
												for="CurrentSupport-4"
											>
												Volunteers
											</label>
										</div>
										<div class="govuk-checkboxes__item">
											<input
												class="govuk-checkboxes__input"
												id="CurrentSupport-5"
												name="CurrentSupport"
												type="checkbox"
												value="charities"
											/>
											<label
												class="govuk-label govuk-checkboxes__label"
												for="CurrentSupport-5"
											>
												Charities
											</label>
										</div>
										<div class="govuk-checkboxes__item">
											<input
												class="govuk-checkboxes__input"
												id="CurrentSupport-6"
												name="CurrentSupport"
												type="checkbox"
												value="hackney council"
											/>
											<label
												class="govuk-label govuk-checkboxes__label"
												for="CurrentSupport-6"
											>
												Hackney Council - such as a
												social worker, carer or housing
												officer
											</label>
										</div>
										<div class="govuk-checkboxes__item">
											<input
												class="govuk-checkboxes__input"
												id="CurrentSupport-7"
												name="CurrentSupport"
												type="checkbox"
												value="someone else"
											/>
											<label
												class="govuk-label govuk-checkboxes__label"
												for="CurrentSupport-7"
											>
												Someone else - such as health
												professionals, including GPs
											</label>
										</div>
										<div class="govuk-checkboxes__item">
											<input
												class="govuk-checkboxes__input"
												id="CurrentSupport-8"
												name="CurrentSupport"
												type="checkbox"
												value="nobody"
											/>
											<label
												class="govuk-label govuk-checkboxes__label"
												for="CurrentSupport-8"
											>
												Nobody, I am not receiving any
												support
											</label>
										</div>
										<div class="govuk-checkboxes__item">
											<input
												class="govuk-checkboxes__input"
												id="CurrentSupport-9"
												name="CurrentSupport"
												type="checkbox"
												value="not sure"
											/>
											<label
												class="govuk-label govuk-checkboxes__label"
												for="CurrentSupport-9"
											>
												Not sure
											</label>
										</div>
									</div>
								</fieldset>
							</div>
						</div>
					</div>
					<div class="govuk-accordion__section">
						<div class="govuk-accordion__section-header">
							<h5 class="govuk-accordion__section-heading">
								<button
									type="button"
									id="default-example-heading-1"
									aria-controls="default-example-content-4"
									class="govuk-accordion__section-button"
									aria-expanded="false"
								>
									Privacy
								</button>
								<span
									class="govuk-accordion__icon"
									aria-hidden="true"
								></span>
							</h5>
						</div>
						<div
							id="default-example-content-1"
							class="govuk-accordion__section-content"
							aria-labelledby="default-example-heading-1"
						>
							<div class="govuk-form-group lbh-form-group">
								<fieldset
									class="govuk-fieldset"
									aria-describedby="consent_to_share-hint"
								>
									<legend class="govuk-fieldset__legend">
										Can we share the information you’ve
										provided with voluntary or community
										organisations?
									</legend>
									<span
										id="consent_to_share-hint"
										class="govuk-hint  lbh-hint"
									>
										For example, sharing your contact
										details with a charity so they can call
										you to offer support.
									</span>
									<div class="govuk-radios govuk-radios--inline lbh-radios">
										<div class="govuk-radios__item">
											<input
												class="govuk-radios__input"
												id="consent_to_share"
												name="consent_to_share"
												type="radio"
												value="yes"
											/>
											<label
												class="govuk-label govuk-radios__label"
												for="consent_to_share"
											>
												Yes
											</label>
										</div>
										<div class="govuk-radios__item">
											<input
												class="govuk-radios__input"
												id="consent_to_share-2"
												name="consent_to_share"
												type="radio"
												value="no"
												checked=""
											/>
											<label
												class="govuk-label govuk-radios__label"
												for="consent_to_share-2"
											>
												No
											</label>
										</div>
									</div>
								</fieldset>
							</div>
						</div>
					</div>
					<div class="govuk-accordion__section">
						<div class="govuk-accordion__section-header">
							<h5 class="govuk-accordion__section-heading">
								<button
									type="button"
									id="default-example-heading-1"
									aria-controls="default-example-content-5"
									class="govuk-accordion__section-button"
									aria-expanded="false"
								>
									Additional Information
								</button>
								<span
									class="govuk-accordion__icon"
									aria-hidden="true"
								></span>
							</h5>
						</div>
						<div
							id="default-example-content-1"
							class="govuk-accordion__section-content"
							aria-labelledby="default-example-heading-1"
						>
							<fieldset class="govuk-fieldset lbh-fieldset">
								<legend class="govuk-fieldset__legend">
									Why are you getting in touch with us today?
									(Optional)
								</legend>
							</fieldset>
							<div class="govuk-form-group lbh-form-group">
								<span
									id="GettingInTouchReason-hint"
									class="govuk-hint  lbh-hint"
								>
									Tell us about your situation and the help
									you need.
								</span>
								<textarea
									class="govuk-textarea  lbh-textarea"
									id="GettingInTouchReason"
									name="GettingInTouchReason"
									rows="5"
									aria-describedby="GettingInTouchReason-hint"
								></textarea>
							</div>
							<h3 class="lbh-heading-h3">
								Is there anything you’d like to tell us about
								the support you’re receiving? (Optional)
							</h3>
							<div class="govuk-form-group lbh-form-group">
								<span
									id="CurrentSupportFeedback-hint"
									class="govuk-hint  lbh-hint"
								>
									For example, who is supporting you, how
									they’re helping or anything else you think
									we should know.
								</span>
								<textarea
									class="govuk-textarea  lbh-textarea"
									id="CurrentSupportFeedback"
									name="CurrentSupportFeedback"
									rows="5"
									aria-describedby="CurrentSupportFeedback-hint"
								></textarea>
							</div>
							<h3 class="lbh-heading-h3">
								Which GP surgery are you registered with?
								(Optional)
							</h3>
							<div class="govuk-form-group lbh-form-group">
								<span
									id="GpSurgeryDetails-hint"
									class="govuk-hint  lbh-hint"
								>
									Please provide the name and address of the
									GP surgery you are registered with. This
									will help us to arrange support for you more
									quickly.
								</span>
								<textarea
									class="govuk-textarea  lbh-textarea"
									id="GpSurgeryDetails"
									name="GpSurgeryDetails"
									rows="5"
									aria-describedby="GpSurgeryDetails-hint"
								></textarea>
							</div>
						</div>
					</div>
				</div>
				<h2 class="lbh-heading-h1">Case notes:</h2>
				<br />
				<h3 class="lbh-heading-h3">Add a new case note (optional):</h3>
				<br />
				<div class="govuk-form-group lbh-form-group">
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
				<br />
				<h3 class="lbh-heading-h3">Case note history:</h3>
				<br />
				<input type="hidden" name="CaseNotes" value="" />
				<br />
				<p class="lbh-body-m"></p>
				<h3 class="lbh-heading-h3">Call attempts history:</h3>
				<br />
				<hr />
				<div class="govuk-grid-row" id="btn-bottom-panel">
					<div class="govuk-grid-column-one-half">
						<a
							href="/help-requests"
							class="govuk-button lbh-button govuk-button--secondary lbh-button--secondary js-cta-btn"
						>
							Cancel
						</a>
						<button
							id="update-btn"
							class="govuk-button lbh-button js-cta-btn"
							data-module="govuk-button"
						>
							Update
						</button>
					</div>
				</div>
			</form>
		</Layout>
	);
}
