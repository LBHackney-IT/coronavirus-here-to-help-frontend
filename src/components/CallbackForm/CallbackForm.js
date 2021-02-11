import React, { useEffect, useState } from 'react';
import { Checkbox, RadioButton, Button, SingleRadioButton } from '../Form';
import KeyInformation from '../KeyInformation/KeyInformation';
import Link from 'next/link';
import { HelpRequestCallGateway } from '../../gateways/help-request-call';
import { ResidentGateway } from '../../gateways/resident';
import { HelpRequestGateway } from '../../gateways/help-request';
import { unsafeExtractUser } from '../../helpers/auth';
import { cevHelpTypes } from '../../helpers/constants';

import { useRouter } from 'next/router';

import {GovNotifyGateway} from '../../gateways/gov-notify'
import {TEST_AND_TRACE_FOLLOWUP_TEXT, TEST_AND_TRACE_FOLLOWUP_EMAIL} from '../../helpers/constants'


export default function CallbackForm({residentId, resident, helpRequest, backHref, saveFunction, editableCaseNotes, helpRequestExists}) {
    const [callMade, setCallMade] = useState(null);
    const [callOutcome, setCallOutcome] = useState("");
    const [followUpRequired, setFollowupRequired] = useState(null)
    const [helpNeeded, setHelpNeeded] = useState("")
    const [callDirection, setCallDirection] = useState("")
    const [callOutcomeValues, setCallOutcomeValues] = useState("")
    const [caseNote, setCaseNote] = useState("")
    const [cevHelpNeeds, setCEVHelpNeeds] = useState({});
    const [errorsExist, setErrorsExist] = useState(null)
    const [phoneNumber, setPhoneNumber] = useState(null)
    const [email, setEmail] = useState(null)
    const [emailTemplatePreview, setEmailTemplatePreview] = useState(null)
    const [textTemplatePreview, setTextTemplatePreview] = useState(null)
    const [showEmail, setShowEmail] = useState(false)
    const [showText, setShowText] = useState(false)

    const [errors, setErrors] = useState({
        CallbackRequired: null,
        HelpNeeded: null,
        CallDirection: null,
        CallOutcome: null,
        CallHandler: null
    });
    const router = useRouter();

    useEffect(() => {
        setHelpNeeded(helpRequest ? helpRequest.helpNeeded : "");
        setCEVHelpNeeds({
            foodAccessVoluntarySector: helpRequest ? helpRequest.helpWithAccessingFood : null,
            prioritySupermarketFoodDelivery: helpRequest ? helpRequest.helpWithAccessingSupermarketFood : null,
            supportCompletingNSSForm: helpRequest ? helpRequest.helpWithCompletingNssForm : null,
            generalCEVGuidance: helpRequest ? helpRequest.helpWithShieldingGuidance : null,
            otherNeeds: helpRequest ? helpRequest.helpWithAccessingOtherEssentials : null,
            noNeedsIdentified: helpRequest ? helpRequest.helpWithNoNeedsIdentified : null
        });
    }, [helpRequest])


    const onCEVHelpNeedsCheckboxChange = (cevHelpItem) => {
        Object.entries(cevHelpTypes).map(([key, cevTextVal]) => {
            if (cevHelpItem === cevTextVal) {
                let cevHelpNeedsCopy = { ...cevHelpNeeds };
                cevHelpNeedsCopy[key] = !cevHelpNeedsCopy[key];
                setCEVHelpNeeds(cevHelpNeedsCopy);
            }
        });
    };

    const metadata =
        helpRequest && helpRequest.metadata
            ? Object.entries(helpRequest.metadata).map(([key, value]) => {
                  key = key.replace(/_/g, ' ');
                  const upcaseKey = key.charAt(0).toUpperCase() + key.slice(1);
                  return (
                      <span class="govuk-caption-l">
                          <strong>{upcaseKey}:</strong> {value}
                      </span>
                  );
              })
            : '';

    const nhsCtasId = helpRequest ? (
        <span class="govuk-caption-l">
            <strong>CTAS ID:</strong> {helpRequest.nhsCtasId || 'Not found'}
        </span>
    ) : (
        ''
    );

    const spokeToResidentCallOutcomes = [
        { name: 'Callback comeplete', value: 'callback_complete' },
        { name: 'Refused to engage', value: 'refused_to_engage' },
        { name: 'Call rescheduled', value: 'call_rescheduled' }
    ];
    const noAnswerCallOutcomes = [
        { name: 'Voicemail left', value: 'voicemail' },
        { name: 'Wrong number', value: 'wrong_number' },
        { name: 'No answer machine', value: 'no_answer_machine' }
    ];
    const callTypes = ['Contact Tracing', 'CEV', 'Welfare Call', 'Help Request'];
    const followupRequired = ['Yes', 'No'];
    const whoMadeInitialContact = ['I called the resident', 'The resident called me'];

    useEffect(async ()=>{
        const govNotifyGateway = new GovNotifyGateway()

        try{

            let textTemplate = await govNotifyGateway.getTemplatePreview(TEST_AND_TRACE_FOLLOWUP_TEXT)
            if(textTemplate){
                setTextTemplatePreview(textTemplate.body)
            }
            let emailTemplate = await govNotifyGateway.getTemplatePreview(TEST_AND_TRACE_FOLLOWUP_EMAIL)
            if(emailTemplate){
                console.log("emailTemplate",emailTemplate)
                setEmailTemplatePreview(emailTemplate.body)
            }
        } catch(err){
            console.log(`Error fetching themplates: ${err}`)
        }


    }, [])

    const setShowContactDetails = value => {
        if(value == TEST_AND_TRACE_FOLLOWUP_EMAIL){
            if(showEmail){
                setShowEmail(false)
                setEmail(null)
            }else{
                setShowEmail(true)
            }
        }
        if(value == TEST_AND_TRACE_FOLLOWUP_TEXT){
            if(showText){
                setShowText(false)
                setPhoneNumber(null)
            }else{
                setShowText(true)
            }
        }
    }


    const callBackFunction = value => {
        if(value=='Yes' || value == 'No'){
            setFollowupRequired(value)
        }
        if (callTypes.includes(value)) {
            setHelpNeeded(value);
        }
    };

    const CallDirectionFunction = (value) => {
        if (value == whoMadeInitialContact[0]) {
            setCallDirection('Outbound');
        }
        if (value == whoMadeInitialContact[1]) {
            setCallDirection('Inbound');
        }
    };
    const updateCallMadeAndCallOutcomeValues = async (value) => {
        setCallOutcome(value);
        setCallOutcomeValues('');
    };

    const onCheckboxChangeUpdate = (value) => {
        if (callOutcomeValues.includes(value)) {
            const callOutcomeArray = callOutcomeValues.split();
            let newCallOutcomesValues = callOutcomeArray.filter(
                (callOutcomeValue) => callOutcomeValue != value
            );
            const callOutcomeString = newCallOutcomesValues.join();
            setCallOutcomeValues(callOutcomeString);
        } else {
            if (!callOutcomeValues) {
                const newCallOutcomesValues = callOutcomeValues.concat(value);
                setCallOutcomeValues(newCallOutcomesValues);
            } else {
                const newCallOutcomesValues = callOutcomeValues.concat(',' + value);
                setCallOutcomeValues(newCallOutcomesValues);
            }
        }
    };

    const validateCEVNeedsFieldset = () => {
        // at least 1 checkbox has to be selected
        return helpNeeded !== 'CEV' || Object.values(cevHelpNeeds).includes(true);
    };

    const handleUpdate = async (event) => {
        event.preventDefault();

        let callbackRequired = followUpRequired == 'Yes' ? true : false;
        let initialCallbackCompleted = followUpRequired == 'Yes' ? false : true;

        const validationFields = [callbackRequired, helpNeeded, callDirection];
        validationFields.forEach((validationField) => {
            if (!validationField) {
                let tempErrors = errors;
                tempErrors.validationField = true;
                setErrors(tempErrors);
            }
        });

        if (callOutcomeValues.length < 1) {
            let tempErrors = errors;
            tempErrors.callOutcomeValues = true;
            setErrors(tempErrors);
        }

        let helpRequestObject = {
            residentId: residentId,
            callbackRequired: callbackRequired,
            initialCallbackCompleted: initialCallbackCompleted,
            dateTimeRecorded: new Date(),
            helpNeeded: helpNeeded
        };

        if (helpNeeded === 'CEV') {
            helpRequestObject.helpWithAccessingFood = cevHelpNeeds.foodAccessVoluntarySector,
            helpRequestObject.helpWithAccessingSupermarketFood = cevHelpNeeds.prioritySupermarketFoodDelivery,
            helpRequestObject.helpWithCompletingNssForm = cevHelpNeeds.supportCompletingNSSForm,
            helpRequestObject.helpWithShieldingGuidance = cevHelpNeeds.generalCEVGuidance,
            helpRequestObject.helpWithAccessingOtherEssentials = cevHelpNeeds.otherNeeds,
            helpRequestObject.helpWithNoNeedsIdentified = cevHelpNeeds.noNeedsIdentified
        }

        // jeez, this looks sooo fragile
        if (!validateCEVNeedsFieldset()) {
            setErrorsExist(true);
        }
        else if (
            (callMade == true && callOutcomeValues.length > 1 && callDirection != null && helpNeeded != null && ((email != null && showEmail) || !showEmail) && ((phoneNumber != null && showText) || !showText)) ||
            (callMade == false && helpNeeded && followUpRequired != null && ((email != null && showEmail) || !showEmail) && ((phoneNumber != null && showText) || !showText)) ||
            (followUpRequired != null && caseNote !="" && helpNeeded != null && helpNeeded != "" && ((email != null && showEmail) || !showEmail) && ((phoneNumber != null && showText) || !showText))
        ) {
            saveFunction(helpNeeded, callDirection, callOutcomeValues, helpRequestObject, callMade, caseNote, phoneNumber, email);
        } else {
            setErrorsExist(true);
        }
    };

    return (
        <>
            {errorsExist && (
                <div
                    className="govuk-error-summary"
                    aria-labelledby="error-summary-title"
                    role="alert"
                    tabIndex="-1"
                    data-module="govuk-error-summary"
                    data-testid="callback-form-validation-error">
                    <h2 className="govuk-error-summary__title" id="error-summary-title">
                        There is a problem
                    </h2>
                    <div className="govuk-error-summary__body">
                        <ul className="govuk-list govuk-error-summary__list">
                            <li>
                                <a href="#">You have not completed the form</a>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
            <h1 className="govuk-heading-xl" style={{ marginTop: '0px', marginBottom: '40px' }}>
                {' '}
                {resident.firstName} {resident.lastName}
                {nhsCtasId}
                {metadata}
            </h1>
            <form>
                <div>
                    <div className="govuk-grid-column">
                        <div className="govuk-form-group lbh-form-group">
                            <div>
                                <div className="govuk-grid-column">
                                    <div className="govuk-form-group lbh-form-group">
                                        <fieldset className="govuk-fieldset">
                                            <legend className="govuk-fieldset__legend mandatoryQuestion">
                                                {' '}
                                                Call type required
                                            </legend>
                                            <br />
                                            {
                                                helpRequestExists && (
                                                    <div>
                                                        {callTypes.map((callType) => (
                                                            <SingleRadioButton
                                                                radioButtonItem={callType}
                                                                onSelectOption={() => {}} //noop
                                                                checked={callType === helpRequest.helpNeeded}
                                                                data-testid="call-type-radio-button"
                                                            />
                                                        ))}
                                                    </div>
                                                ) || <RadioButton
                                                        radioButtonItems={callTypes}
                                                        name="HelpNeeded"
                                                        onSelectOption={(callBackFunction)}
                                                        data-testid="call-type-radio-button"
                                                    />
                                            }
                                        </fieldset>
                                    </div>
                                </div>
                            </div>
                            <br />
                            {helpNeeded === 'CEV' && (
                                <fieldset className="govuk-fieldset govuk-!-margin-bottom-7" data-testid="cev-help-needs">
                                    <legend className="govuk-fieldset__legend mandatoryQuestion">
                                        Help needed because of coronavirus
                                    </legend>
                                    <span
                                        id="cev-help-needs-hint"
                                        className="govuk-hint govuk-!-margin-bottom-6">
                                        Select all that apply
                                    </span>
                                    {Object.keys(cevHelpTypes).map((key, index) => {
                                        return (
                                            <Checkbox
                                                key={index}
                                                value={cevHelpTypes[key]}
                                                label={cevHelpTypes[key]}
                                                checked={cevHelpNeeds[key]}
                                                aria-describedby="cev-help-needs-hint"
                                                onCheckboxChange={
                                                    onCEVHelpNeedsCheckboxChange
                                                }></Checkbox>
                                        );
                                    })}
                                </fieldset>
                            )}
                            <fieldset className="govuk-fieldset">
                                <legend className="govuk-fieldset__legend mandatoryQuestion">
                                    {' '}
                                    Do you need to log new call details?{' '}
                                </legend>
                                <br />
                                <div
                                    className="govuk-radios  lbh-radios govuk-radios--conditional"
                                    data-module="govuk-radios">
                                    <div className="govuk-radios__item">
                                        <input
                                            className="govuk-radios__input"
                                            id="CallMade"
                                            name="CallMade"
                                            type="radio"
                                            value="yes"
                                            onChange={() => {
                                                setCallMade(true);
                                            }}
                                            aria-controls="conditional-CallMade"
                                            aria-expanded="false"
                                        />
                                        <label
                                            className="govuk-label govuk-radios__label"
                                            htmlFor="CallMade">
                                            {' '}
                                            Yes{' '}
                                        </label>
                                    </div>
                                    {callMade && (
                                        <div
                                            className="govuk-radios__conditional govuk-radios__conditional--hidden"
                                            id="conditional-CallMade">
                                            <div className="govuk-form-group lbh-form-group">
                                                <fieldset className="govuk-fieldset">
                                                    <legend className="govuk-fieldset__legend mandatoryQuestion">
                                                        Did you speak to a resident?
                                                    </legend>
                                                    <div
                                                        className="govuk-radios govuk-radios--inline lbh-radios govuk-radios--conditional"
                                                        data-module="govuk-radios">
                                                        <div className="govuk-radios__item">
                                                            <input
                                                                className="govuk-radios__input"
                                                                id="CallDetail"
                                                                name="CallDetail"
                                                                type="radio"
                                                                value="spoke_to_resident"
                                                                onChange={() => {
                                                                    updateCallMadeAndCallOutcomeValues(
                                                                        'spoke to resident'
                                                                    );
                                                                }}
                                                                aria-controls="conditional-CallDetail"
                                                                aria-expanded="false"
                                                            />
                                                            <label
                                                                className="govuk-label govuk-radios__label"
                                                                htmlFor="CallDetail">
                                                                Yes - spoke to resident
                                                            </label>
                                                        </div>
                                                        {callOutcome == 'spoke to resident' && (
                                                            <div
                                                                className="govuk-radios__conditional govuk-radios__conditional--hidden"
                                                                id="conditional-CallDetail">
                                                                <div>
                                                                    <div className="display-spoke-to-resident">
                                                                        <div className="govuk-form-group lbh-form-group">
                                                                            <span
                                                                                id="CallOutcome-hint"
                                                                                className="govuk-hint  lbh-hint">
                                                                                Select a call
                                                                                outcome
                                                                            </span>
                                                                            {spokeToResidentCallOutcomes.map(
                                                                                (
                                                                                    spokeToResidentCallOutcome
                                                                                ) => {
                                                                                    return (
                                                                                        <Checkbox
                                                                                            id={
                                                                                                spokeToResidentCallOutcome.name
                                                                                            }
                                                                                            name="spokeToResidentCallOutcome"
                                                                                            type="checkbox"
                                                                                            value={
                                                                                                spokeToResidentCallOutcome.value
                                                                                            }
                                                                                            label={
                                                                                                spokeToResidentCallOutcome.name
                                                                                            }
                                                                                            aria-describedby="CallOutcome-hint"
                                                                                            onCheckboxChange={
                                                                                                onCheckboxChangeUpdate
                                                                                            }></Checkbox>
                                                                                    );
                                                                                }
                                                                            )}
                                                                        </div>
                                                                        <div className="display-call-attempted"></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )}
                                                        <div className="govuk-radios__item">
                                                            <input
                                                                className="govuk-radios__input"
                                                                id="CallDetail-2"
                                                                name="CallDetail"
                                                                type="radio"
                                                                value="call_attempted"
                                                                onChange={() => {
                                                                    updateCallMadeAndCallOutcomeValues(
                                                                        'call attempted'
                                                                    );
                                                                }}
                                                                aria-controls="conditional-CallDetail-2"
                                                                aria-expanded="false"
                                                            />
                                                            <label
                                                                className="govuk-label govuk-radios__label"
                                                                htmlFor="CallDetail-2">
                                                                No - call attempted
                                                            </label>
                                                        </div>
                                                        {callOutcome == 'call attempted' && (
                                                            <div
                                                                className="govuk-radios__conditional govuk-radios__conditional--hidden"
                                                                id="conditional-CallDetail-2">
                                                                <div className="display-call-attempted">
                                                                    <div className="govuk-form-group lbh-form-group">
                                                                        <span
                                                                            id="CallOutcome-hint"
                                                                            className="govuk-hint  lbh-hint">
                                                                            {' '}
                                                                            Select a call outcome{' '}
                                                                        </span>
                                                                        {noAnswerCallOutcomes.map(
                                                                            (
                                                                                noAnswerCallOutcome
                                                                            ) => {
                                                                                return (
                                                                                    <Checkbox
                                                                                        id={
                                                                                            noAnswerCallOutcome.name
                                                                                        }
                                                                                        name="noAnswerCallOutcome"
                                                                                        type="checkbox"
                                                                                        value={
                                                                                            noAnswerCallOutcome.value
                                                                                        }
                                                                                        label={
                                                                                            noAnswerCallOutcome.name
                                                                                        }
                                                                                        onCheckboxChange={
                                                                                            onCheckboxChangeUpdate
                                                                                        }
                                                                                        aria-describedby="CallOutcome-hint"></Checkbox>
                                                                                );
                                                                            }
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </fieldset>
                                            </div>

                                            <div className="govuk-form-group lbh-form-group">
                                                <fieldset className="govuk-fieldset">
                                                    <legend className="govuk-fieldset__legend mandatoryQuestion">
                                                        {' '}
                                                        Who made the call today?{' '}
                                                    </legend>
                                                    <RadioButton
                                                        radioButtonItems={whoMadeInitialContact}
                                                        name="InitialContact"
                                                        onSelectOption={CallDirectionFunction}
                                                    />
                                                </fieldset>
                                            </div>
                                        </div>
                                    )}
                                    <div className="govuk-radios__item">
                                        <input
                                            className="govuk-radios__input"
                                            id="CallMade-2"
                                            name="CallMade"
                                            type="radio"
                                            value="no"
                                            onChange={() => setCallMade(false)}
                                            data-testid="call-type-no-radio-button"
                                        />
                                        <label
                                            className="govuk-label govuk-radios__label"
                                            htmlFor="CallMade-2">
                                            No
                                        </label>
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                    </div>
                </div>
                <hr className="govuk-section-break govuk-section-break--m govuk-section-break" />
                <h2 className="govuk-heading-l">Case notes:</h2>
                {editableCaseNotes && <><h3 className="govuk-heading-m">
                    Add a new case note (optional):
                </h3>
                <div className="govuk-form-group">
                    <span id="NewCaseNote-hint" className="govuk-hint  lbh-hint"></span>
                    <textarea
                        className="govuk-textarea  lbh-textarea"
                        id="NewCaseNote"
                        name="NewCaseNote"
                        rows="5"
                        onChange = {(e) => {setCaseNote(e.target.value)}}
                        aria-describedby="NewCaseNote-hint">
                    </textarea>
                </div></>}
                <br></br>


                <fieldset className="govuk-fieldset">
                    <h3 className="govuk-heading-m">Would you like to message the resident following this call?</h3>

                    <Checkbox
                        id='SendEmail'
                        name="SendEmail"
                        data-testid='send-email-checkbox'
                        type="checkbox"
                        value={TEST_AND_TRACE_FOLLOWUP_EMAIL}
                        label="Send Email"
                        aria-describedby="SendEmail"
                        onCheckboxChange={setShowContactDetails}>
                    </Checkbox>
                    {showEmail &&
                        <div className="govuk-radios__conditional govuk-radios__conditional--hidden" id="conditional-contact">
                            <br/>
                            {emailTemplatePreview &&
                                <div className="govuk-form-group">
                                    <div>
                                    <label className="govuk-label" for="contact-by-email">Email address</label>
                                    <input className="govuk-input govuk-!-width-one-third" id="contact-by-email" name="contact-by-email" type="email" spellcheck="false" onChange={(e)=>setEmail(e.target.value)}/>
                                </div>
                                <br/><br/>
                                <div id="contact-hint" className="govuk-hint">Email preview</div>
                                <div id = "email-template-preview" className="govuk-inset-text" data-testid='send-email-preview'>{emailTemplatePreview}</div>
                            </div>
                            }
                            {!emailTemplatePreview &&
                                <div className="govuk-warning-text">
                                    <span className="govuk-warning-text__icon" aria-hidden="true">!</span>
                                    <strong className="govuk-warning-text__text">
                                    <span className="govuk-warning-text__assistive">Warning</span>
                                        There is no email option for this call type, please uncheck this option to proceed
                                    </strong>
                                </div>
                            }
                            <br/>
                        </div>
                    }
                    <Checkbox
                        id='SendText'
                        name="SendText"
                        type="checkbox"
                        data-testid='send-text-checkbox'
                        value={TEST_AND_TRACE_FOLLOWUP_TEXT}
                        label="Send Text"
                        aria-describedby="SendEmail"
                        onCheckboxChange={setShowContactDetails}>
                    </Checkbox>
                    {showText  &&
                        <div className="govuk-radios__conditional govuk-radios__conditional--hidden" id="conditional-contact-3">
                            <br/>
                            {textTemplatePreview &&
                            <div className="govuk-form-group">
                                <div>
                                    <label className="govuk-label" for="contact-by-text">Mobile phone number</label>
                                    <input className="govuk-input govuk-!-width-one-third" id="contact-by-text" name="contact-by-text" type="tel" onChange={(e)=>{setPhoneNumber(e.target.value)}}/>
                                </div>
                                <br/><br/>
                                    <div id="contact-hint" className="govuk-hint">Text preview</div>
                                    <div className="govuk-inset-text" data-testid='send-text-preview'>{textTemplatePreview}</div>
                                </div>
                            }
                             <br/>
                            {!textTemplatePreview &&
                                <div className="govuk-warning-text">
                                    <span className="govuk-warning-text__icon" aria-hidden="true">!</span>
                                    <strong className="govuk-warning-text__text">
                                    <span className="govuk-warning-text__assistive">Warning</span>
                                    There is no text option for this call type, please uncheck this option to proceed
                                    </strong>
                                </div>
                            }
                            <br/>
                        </div>

                    }
                    <br />

                </fieldset>

                <br/>
                <div className="govuk-grid-column">
                    <div className="govuk-form-group lbh-form-group">
                        <fieldset className="govuk-fieldset">
                            <legend className="govuk-fieldset__legend mandatoryQuestion">
                                Follow-up required?
                            </legend>
                            <br />
                            <RadioButton
                                radioButtonItems={followupRequired}
                                name="FollowUpRequired"
                                optionalClass="govuk-radios--inline"
                                onSelectOption={callBackFunction}
                                data-testid="followup-required-radio-button"
                            />
                        </fieldset>
                    </div>
                </div>
                <div id="btn-bottom-panel">
                    <div className="govuk-grid-column">
                        <Button
                            text="Update"
                            addClass="govuk-!-margin-right-1"
                            onClick={(event) => {
                                handleUpdate(event);
                            }}
                            data-testid="callback-form-update_button"
                        />
                        <Link href={backHref}>
                            <Button
                                text="Cancel"
                                addClass="govuk-button--secondary"
                                data-testid="callback-form-cancel_button"
                            />
                        </Link>
                    </div>
                </div>
            </form>
        </>
    );
}
