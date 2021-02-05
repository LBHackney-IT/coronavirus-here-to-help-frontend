import React, { useEffect, useState } from "react";
import { Checkbox, RadioButton, Button } from "../Form";
import KeyInformation from "../KeyInformation/KeyInformation";
import Link from "next/link";
import { HelpRequestCallGateway } from '../../gateways/help-request-call';
import { ResidentGateway } from '../../gateways/resident';
import { HelpRequestGateway } from '../../gateways/help-request';
import {unsafeExtractUser} from '../../helpers/auth';

import { useRouter } from "next/router";

export default function CallbackForm({residentId, resident, helpRequest, backHref, saveFunction, editableCaseNotes}) {
    const [callMade, setCallMade] = useState(null);
    const [callOutcome, setCallOutcome] = useState("");
    const [followUpRequired, setFollowupRequired] = useState(null)
    const [helpNeeded, setHelpNeeded] = useState("")
    const [callDirection, setCallDirection] = useState("")
    const [callOutcomeValues, setCallOutcomeValues] = useState("")
    const [caseNote, setCaseNote] = useState("")
    const [errors, setErrors] = useState({
        CallbackRequired: null,
        HelpNeeded: null,
        CallDirection: null,
        CallOutcome: null,
        CallHandler: null
    })
    const router = useRouter()

    const [errorsExist, setErrorsExist] = useState(null)

    const spokeToResidentCallOutcomes = [
        {name: "Callback comeplete" ,value: "callback_complete"},
        {name: "Refused to engage" ,value: "refused_to_engage"},
        {name: "Call rescheduled" ,value: "call_rescheduled"},

    ];
    const noAnswerCallOutcomes = [
        {name: "Voicemail left" ,value: "voicemail"},
        {name: "Wrong number" , value: "wrong_number"},
        {name: "No answer machine" ,value: "no_answer_machine"},
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
        if(value=='Yes' || value == 'No'){
            console.log(value)
            setFollowupRequired(value)
        }
        if(callTypes.includes(value)){
            setHelpNeeded(value)
        }

    }

    const CallDirectionFunction = value => {
        if(value == whoMadeInitialContact[0]){
            setCallDirection("Outbound")
        }
        if(value == whoMadeInitialContact[1]){
            setCallDirection("Inbound")
        }
    }
    const updateCallMadeAndCallOutcomeValues = async value => {
        setCallOutcome(value)
        setCallOutcomeValues('')
    }

    const onCheckboxChangeUpdate = (value) => {
        if(callOutcomeValues.includes(value)) {
            const callOutcomeArray = callOutcomeValues.split();
            let newCallOutcomesValues = callOutcomeArray.filter(callOutcomeValue => callOutcomeValue != value)
            const callOutcomeString = newCallOutcomesValues.join()
            setCallOutcomeValues(callOutcomeString)
        }
        else{
            if(!callOutcomeValues){
                const newCallOutcomesValues = callOutcomeValues.concat(value)
                setCallOutcomeValues(newCallOutcomesValues)
            }else {
                const newCallOutcomesValues = callOutcomeValues.concat(','+value)
                setCallOutcomeValues(newCallOutcomesValues)
            }
        }
    }
    const handleUpdate = async (event) => {
        event.preventDefault();

        let callbackRequired = (followUpRequired == "Yes") ? true : false
        let initialCallbackCompleted = (followUpRequired == "Yes") ? false : true

        const validationFields = [callbackRequired, helpNeeded, callDirection]
        validationFields.forEach(validationField => {
            if(!validationField) {
                let tempErrors = errors
                tempErrors.validationField = true
                setErrors(tempErrors)
            }
        });

        if(callOutcomeValues.length < 1) {
            let tempErrors = errors
            tempErrors.callOutcomeValues = true
            setErrors(tempErrors)
        }

        let helpRequestObject = {
            residentId: residentId,
            callbackRequired: callbackRequired,
            initialCallbackCompleted: initialCallbackCompleted,
            dateTimeRecorded: new Date(),
            helpNeeded: helpNeeded
        }

        if (
            (callMade == true &&
                callOutcomeValues.length > 1 &&
                callDirection != null &&
                helpNeeded != null) ||
            (callMade == false && helpNeeded && followUpRequired != null) ||
            (followUpRequired != null && caseNote !="")
        ) {
            saveFunction(helpNeeded, callDirection, callOutcomeValues, helpRequestObject, callMade, caseNote);
        } else {
            setErrorsExist(true);
        }
    }

    return (
        <>
            {errorsExist &&
            <div className="govuk-error-summary" aria-labelledby="error-summary-title" role="alert"
                 tabIndex="-1" data-module="govuk-error-summary" data-testid="callback-form-validation-error">
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
            </div>}
            <h1 className="govuk-heading-xl"
                style={{marginTop: "0px", marginBottom: "40px"}}> {resident.firstName} {resident.lastName}
                {helpRequest ? (
                  <span class="govuk-caption-l">
                      <strong>CTAS ID:</strong> {helpRequest.nhsCtasId || "Not found"}
                  </span>
                ) : ('')}
            </h1>
            <form >
                <div>
                    <div className="govuk-grid-column">
                        <div className="govuk-form-group lbh-form-group">
                            <div>
                                <div className="govuk-grid-column">
                                    <div className="govuk-form-group lbh-form-group">
                                        <fieldset className="govuk-fieldset">
                                            <legend className="govuk-fieldset__legend mandatoryQuestion"> Call type required</legend>
                                            <br />
                                            <RadioButton radioButtonItems={callTypes} name="HelpNeeded" onSelectOption = {callBackFunction} data-testid="call-type-radio-button" />
                                        </fieldset>
                                    </div>
                                </div>
                            </div>
                            <br/>
                            <fieldset className="govuk-fieldset">
                                <legend className="govuk-fieldset__legend mandatoryQuestion"> Do you need to log new call details? </legend>
                                <br />
                                <div className="govuk-radios  lbh-radios govuk-radios--conditional" data-module="govuk-radios">
                                    <div className="govuk-radios__item">
                                        <input
                                            className="govuk-radios__input"
                                            id="CallMade"
                                            name="CallMade"
                                            type="radio"
                                            value="yes"
                                            onChange = { () => { setCallMade(true)}}
                                            aria-controls="conditional-CallMade"
                                            aria-expanded="false"
                                        />
                                        <label className="govuk-label govuk-radios__label" htmlFor="CallMade"> Yes </label>
                                    </div>
                                    {callMade &&
                                    <div className="govuk-radios__conditional govuk-radios__conditional--hidden" id="conditional-CallMade">
                                        <div className="govuk-form-group lbh-form-group">
                                            <fieldset className="govuk-fieldset">
                                                <legend className="govuk-fieldset__legend mandatoryQuestion">Did you speak to a resident?</legend>
                                                <div className="govuk-radios govuk-radios--inline lbh-radios govuk-radios--conditional" data-module="govuk-radios">
                                                    <div className="govuk-radios__item">
                                                        <input
                                                            className="govuk-radios__input"
                                                            id="CallDetail"
                                                            name="CallDetail"
                                                            type="radio"
                                                            value="spoke_to_resident"
                                                            onChange = {() => {updateCallMadeAndCallOutcomeValues("spoke to resident")}}
                                                            aria-controls="conditional-CallDetail"
                                                            aria-expanded="false"
                                                        />
                                                        <label className="govuk-label govuk-radios__label" htmlFor="CallDetail">Yes - spoke to resident</label>
                                                    </div>
                                                    {callOutcome =="spoke to resident" &&
                                                    <div className="govuk-radios__conditional govuk-radios__conditional--hidden" id="conditional-CallDetail">
                                                        <div>
                                                            <div className="display-spoke-to-resident">
                                                                <div className="govuk-form-group lbh-form-group">
                                                                    <span id="CallOutcome-hint" className="govuk-hint  lbh-hint">Select a call outcome</span>
                                                                    {spokeToResidentCallOutcomes.map((spokeToResidentCallOutcome) => {
                                                                        return (
                                                                            <Checkbox
                                                                                id={spokeToResidentCallOutcome.name}
                                                                                name="spokeToResidentCallOutcome"
                                                                                type="checkbox"
                                                                                value={spokeToResidentCallOutcome.value}
                                                                                label={spokeToResidentCallOutcome.name}
                                                                                aria-describedby="CallOutcome-hint"
                                                                                onCheckboxChange={onCheckboxChangeUpdate}>
                                                                            </Checkbox>
                                                                        );
                                                                    })}
                                                                </div>
                                                                <div className="display-call-attempted"></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    }
                                                    <div className="govuk-radios__item">
                                                        <input
                                                            className="govuk-radios__input"
                                                            id="CallDetail-2"
                                                            name="CallDetail"
                                                            type="radio"
                                                            value="call_attempted"
                                                            onChange= { () => {updateCallMadeAndCallOutcomeValues("call attempted")}}
                                                            aria-controls="conditional-CallDetail-2"
                                                            aria-expanded="false"
                                                        />
                                                        <label className="govuk-label govuk-radios__label" htmlFor="CallDetail-2">
                                                            No - call attempted
                                                        </label>
                                                    </div>
                                                    {callOutcome  =="call attempted" &&
                                                    <div className="govuk-radios__conditional govuk-radios__conditional--hidden" id="conditional-CallDetail-2">
                                                        <div className="display-call-attempted">
                                                            <div className="govuk-form-group lbh-form-group">
                                                                <span id="CallOutcome-hint" className="govuk-hint  lbh-hint"> Select a call outcome </span>
                                                                {noAnswerCallOutcomes.map((noAnswerCallOutcome) => {
                                                                    return (
                                                                        <Checkbox
                                                                            id={noAnswerCallOutcome.name}
                                                                            name="noAnswerCallOutcome"
                                                                            type="checkbox"
                                                                            value={noAnswerCallOutcome.value}
                                                                            label={noAnswerCallOutcome.name}
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

                                        <div className="govuk-form-group lbh-form-group">
                                            <fieldset className="govuk-fieldset">
                                                <legend className="govuk-fieldset__legend mandatoryQuestion"> Who made the call today? </legend>
                                                <RadioButton radioButtonItems={whoMadeInitialContact} name="InitialContact" onSelectOption={CallDirectionFunction} />
                                            </fieldset>
                                        </div>
                                    </div>
                                    }
                                    <div className="govuk-radios__item">
                                        <input
                                            className="govuk-radios__input"
                                            id="CallMade-2"
                                            name="CallMade"
                                            type="radio"
                                            value="no"
                                            onChange = { () => setCallMade(false)}
                                            data-testid="call-type-no-radio-button"
                                        />
                                        <label className="govuk-label govuk-radios__label" htmlFor="CallMade-2">No</label>
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
                <div className="govuk-grid-column">
                    <div className="govuk-form-group lbh-form-group">
                        <fieldset className="govuk-fieldset">
                            <legend className="govuk-fieldset__legend mandatoryQuestion">Follow-up required?</legend>
                            <br />
                            <RadioButton radioButtonItems={followupRequired} name="FollowUpRequired" optionalClass = "govuk-radios--inline" onSelectOption = {callBackFunction}  data-testid="followup-required-radio-button"/>
                        </fieldset>
                    </div>
                </div>
                <div id="btn-bottom-panel">
                    <div className="govuk-grid-column">
                        <Button text="Update" addClass="govuk-!-margin-right-1" onClick={(event)=> { handleUpdate(event)}}  data-testid="callback-form-update_button"/>
                        <Link href={backHref}>
                            <Button text="Cancel" addClass="govuk-button--secondary" data-testid="callback-form-cancel_button"/>
                        </Link>
                    </div>
                </div>
            </form>
        </>
    );
}
