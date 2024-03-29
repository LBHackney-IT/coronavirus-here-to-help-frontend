import React, { useEffect, useState } from 'react';
import { Checkbox, RadioButton, Button } from '../Form';
import Link from 'next/link';
import {
    DEFAULT_DROPDOWN_OPTION,
    cevHelpTypes,
    selfIsolationCallTypes,
    TEST_AND_TRACE_FOLLOWUP_TEXT,
    TEST_AND_TRACE_FOLLOWUP_EMAIL,
    WELFARE_CALL,
    HELP_TYPE,
    CONTACT_TYPE,
    TEMPLATE_ID_ALIASES,
    LINK_WORK
} from '../../helpers/constants';
import { formatSubText } from '../../helpers/formatter';
import { GovNotifyGateway } from '../../gateways/gov-notify';
import styles from '../CallbackForm/CallbackForm.module.scss';
import { AuthorisedCallTypesGateway } from '../../gateways/authorised-call-types';
import cbCSS from './CallbackForm.module.css';
import Dropdown from '../../components/Form/Dropdown/Dropdown';

export default function CallbackForm({
    residentId,
    resident,
    helpRequest,
    backHref,
    saveFunction,
    editableCaseNotes,
    helpRequestExists
}) {
    const [callMade, setCallMade] = useState(null);
    const [callOutcome, setCallOutcome] = useState('');
    const [followUpRequired, setFollowupRequired] = useState(null);
    const [helpNeeded, setHelpNeeded] = useState('');
    const [callDirection, setCallDirection] = useState('');
    const [callOutcomeValues, setCallOutcomeValues] = useState('');
    const [caseNote, setCaseNote] = useState('');
    const [cevHelpNeeds, setCEVHelpNeeds] = useState({});
    const [errorsExist, setErrorsExist] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState(null);
    const [email, setEmail] = useState(null);
    const [emailTemplatePreview, setEmailTemplatePreview] = useState(null);
    const [textTemplatePreview, setTextTemplatePreview] = useState(null);
    const [showEmail, setShowEmail] = useState(false);
    const [showText, setShowText] = useState(false);
    const [submitEnabled, setSubmitEnabled] = useState(true);
    const [callTypes, setCallTypes] = useState([]);
    const [authCallTypes, setAuthCallTypes] = useState([]);
    const [subTypesDropdown, setSubTypesDropdown] = useState([]);
    const [helpNeededSubtype, setHelpNeededSubtype] = useState('');

    const [errors, setErrors] = useState({
        CallbackRequired: null,
        HelpNeeded: null,
        CallDirection: null,
        CallOutcome: null,
        CallHandler: null
    });

    const preSetFormStateWithData = async () => {
        setHelpNeeded(helpRequest ? helpRequest.helpNeeded : '');
        setCEVHelpNeeds({
            foodAccessVoluntarySector: helpRequest ? helpRequest.helpWithAccessingFood : null,
            prioritySupermarketFoodDelivery: helpRequest
                ? helpRequest.helpWithAccessingSupermarketFood
                : null,
            supportCompletingNSSForm: helpRequest ? helpRequest.helpWithCompletingNssForm : null,
            generalCEVGuidance: helpRequest ? helpRequest.helpWithShieldingGuidance : null,
            otherNeeds: helpRequest ? helpRequest.helpWithAccessingOtherEssentials : null,
            noNeedsIdentified: helpRequest ? helpRequest.helpWithNoNeedsIdentified : null
        });

        const authorisedCallTypesGateway = new AuthorisedCallTypesGateway();

        try {
            let authCallTypes = await authorisedCallTypesGateway.getCallTypes();
            setAuthCallTypes(authCallTypes);
            setCallTypes(authCallTypes.map((callType) => callType.name));
        } catch (err) {
            console.log(`Error fetching auth calltypes: ${err}`);
        }
    };

    useEffect(() => { preSetFormStateWithData(); }, [helpRequest]);

    const onCEVHelpNeedsCheckboxChange = (cevHelpItem) => {
        Object.entries(cevHelpTypes).map(([key, cevTextVal]) => {
            if (cevHelpItem === cevTextVal) {
                let cevHelpNeedsCopy = { ...cevHelpNeeds };
                cevHelpNeedsCopy[key] = !cevHelpNeedsCopy[key];
                setCEVHelpNeeds(cevHelpNeedsCopy);
            }
        });
    };

    const fetchTemplates = async () => {
        // a workaround for template fetch firing off before the help requests's help type
        // state being fetched and set. The problem was that incorrect template alias would
        // be used as a result of 'undefined' help type. The solution is to tirgger template
        // fetch on checkbox tick, which is way past the page load mark, giving enough time
        // for any state to get set.
        const govNotifyGateway = new GovNotifyGateway();

        const smsTemplateName = helpTypeToTemplateNameMap(helpNeeded, CONTACT_TYPE.SMS_TEXT);
        const emailTemplateName = helpTypeToTemplateNameMap(helpNeeded, CONTACT_TYPE.EMAIL);
        try {
            let textTemplate = await govNotifyGateway.getTemplatePreview(
                smsTemplateName,
                templateParamsBuilder(smsTemplateName)
            );
            if (textTemplate) {
                setTextTemplatePreview(textTemplate.body);
            }
            let emailTemplate = await govNotifyGateway.getTemplatePreview(
                emailTemplateName,
                templateParamsBuilder(emailTemplateName)
            );
            if (emailTemplate) {
                console.log('emailTemplate', emailTemplate);
                setEmailTemplatePreview(emailTemplate.body);
            }
        } catch (err) {
            console.log(`Error fetching themplates: ${err}`);
        }
    };

    const metadata =
        helpRequest && helpRequest.metadata
            ? Object.entries(helpRequest.metadata).map(([key, value], index) => {
                  key = key.replace(/_/g, ' ');
                  const upcaseKey = key.charAt(0).toUpperCase() + key.slice(1);
                  return (
                      <span key={"metadata-" + index} data-testid="metadata" className="govuk-caption-l">
                          <strong>{upcaseKey}:</strong> {value}
                      </span>
                  );
              })
            : '';

    const nhsCtasId = helpRequest ? ( // TODO: make visible on when request type is CTAS
        <span className="govuk-caption-l" data-testid="ctas-id">
            <strong>CTAS ID:</strong> {helpRequest.nhsCtasId || 'Not found'}
        </span>
    ) : (
        ''
    );

    const spokeToResidentCallOutcomes = [
        { name: 'Callback complete', value: 'callback_complete' },
        { name: 'Refused to engage', value: 'refused_to_engage' },
        { name: 'Call rescheduled', value: 'call_rescheduled' }
    ];
    const noAnswerCallOutcomes = [
        { name: 'Voicemail left', value: 'voicemail' },
        { name: 'Wrong number', value: 'wrong_number' },
        { name: 'No answer machine', value: 'no_answer_machine' }
    ];
    const selfIsolationNeeds = [
        {
            name: 'Yes, the resident needed a referral to the food consortia',
            value: 'food_consortia_referral_needs'
        },
        { name: 'Yes, the resident had other support needs', value: 'other_support_needs' },
        { name: 'No, the resident did not require support', value: 'no_support_needs' }
    ];

    const followupRequired = ['Yes', 'No'];
    const whoMadeInitialContact = ['I called the resident', 'The resident called me'];

    const helpTypeToTemplateNameMap = (helpType, contactType) => {
        const isEmail = contactType === CONTACT_TYPE.EMAIL;
        switch (helpType) {
            case HELP_TYPE.EUSS:
                return isEmail
                    ? TEMPLATE_ID_ALIASES.EUSS_EMAIL_PRE_CALL_TEMPLATE // pre call email
                    : TEMPLATE_ID_ALIASES.EUSS_SMS_FOLLOW_UP_NO_ANSWER_TEMPLATE; // no answer sms - makes no UX sense, but I;ve confirmed with the client & it seems they want it this way due to get faster delivery
            default:
                return isEmail ? TEST_AND_TRACE_FOLLOWUP_EMAIL : TEST_AND_TRACE_FOLLOWUP_TEXT;
        }
    };


  const templateParamsBuilder = (templateName) => {
        let templateParams = {};
        switch (templateName) {
            case TEMPLATE_ID_ALIASES.EUSS_EMAIL_PRE_CALL_TEMPLATE:
                templateParams.firstName = resident.firstName;
                break;
            case TEMPLATE_ID_ALIASES.EUSS_SMS_FOLLOW_UP_NO_ANSWER_TEMPLATE:
                templateParams.firstName = resident.firstName;
                break;
            default:
                break;
        }
        return templateParams;
    };

    // create a command, which instructs the save function to send one, or the other, or both
    const notifyRequestOptionsConstructor = (helpNeeded, phoneNumber, email) => {
        const smsTemplateName = helpTypeToTemplateNameMap(helpNeeded, CONTACT_TYPE.SMS_TEXT);
        const emailTemplateName = helpTypeToTemplateNameMap(helpNeeded, CONTACT_TYPE.EMAIL);

        return {
            smsText: phoneNumber
                ? {
                      phoneNumber,
                      templateName: smsTemplateName,
                      templateParams: templateParamsBuilder(smsTemplateName)
                  }
                : undefined,
            email: email
                ? {
                      email,
                      templateName: emailTemplateName,
                      templateParams: templateParamsBuilder(emailTemplateName)
                  }
                : undefined
        };
    };

    // Wtf is this? Why do we have presentation logic mixed up with validation?
    const setShowContactDetails = (value) => {
        if (value == TEST_AND_TRACE_FOLLOWUP_EMAIL) {
            if (showEmail) {
                setShowEmail(false);
                setEmail(null);
            } else {
                setShowEmail(true);
            }
        }
        if (value == TEST_AND_TRACE_FOLLOWUP_TEXT) {
            if (showText) {
                setShowText(false);
                setPhoneNumber(null);
            } else {
                setShowText(true);
            }
        }
    };

    const followUpRequiredFunction = (value) => {
        setFollowupRequired(value);
    };

    const callBackFunction = (value) => {
        if (callTypes.includes(value)) {
            setHelpNeeded(value);
            setSubtypeDropdownValues(value);
        }
    };

    const setSubtypeDropdownValues = (selectedCallType) => {
        const subtypes = authCallTypes.filter((callType) => callType.name == selectedCallType)[0]
            .subtypes;
        if (subtypes) {
            setSubTypesDropdown([DEFAULT_DROPDOWN_OPTION].concat(subtypes));
        } else {
            setSubTypesDropdown([]);
        }
    };

    const updateSubTypeSelection = (value) => {
        setHelpNeededSubtype(value === DEFAULT_DROPDOWN_OPTION ? '' : value);
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
            const callOutcomeArray = callOutcomeValues.split(',');
            let newCallOutcomesValues = callOutcomeArray.filter(
                (callOutcomeValue) => callOutcomeValue != value
            );
            if (value == 'callback_complete') {
                newCallOutcomesValues = newCallOutcomesValues.filter(
                    (callOutcomeValue) =>
                        callOutcomeValue != 'food_consortia_referral_needs' &&
                        callOutcomeValue != 'other_support_needs' &&
                        callOutcomeValue != 'no_support_needs'
                );
            }

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

    const atLeast1CEVNeedsCheckboxIsSelected = () => {
        // Returns "false" only when helpNeeded = 'CEV' and 0 CEV needs checkboxes are selected.
        return helpNeeded !== 'CEV' || Object.values(cevHelpNeeds).includes(true);
    };
    const validateSelfIsolationNeedsFieldset = () => {
        return (
            (callOutcomeValues.includes('callback_complete') &&
                helpNeeded === WELFARE_CALL &&
                (callOutcomeValues.includes('food_consortia_referral_needs') ||
                    callOutcomeValues.includes('other_support_needs') ||
                    callOutcomeValues.includes('no_support_needs'))) ||
            !callOutcomeValues.includes('callback_complete') ||
            helpNeeded !== WELFARE_CALL
        );
    };

    // Checks to see if the UI field was set (from null) to boolean (true, false) value, or if UI
    // field was set to a Truthy value: from null, undefined or "" to "CEV", "Welfare", etc.
    const isBooleanOrTruthyValue = (uiFieldValue) =>
        uiFieldValue === false || uiFieldValue ? true : false;

    const mandatoryFieldsWereGivenInput = () => {
        const supportTypeIsSelected = isBooleanOrTruthyValue(helpNeeded);
        const whetherTheCallWasMadeIsSelected = isBooleanOrTruthyValue(callMade);
        const whetherTicketNeedsFollowUpIsSelected = isBooleanOrTruthyValue(followUpRequired);

        const whenNotHiddenCEVNeedsAreSelected = atLeast1CEVNeedsCheckboxIsSelected();

        return (
            supportTypeIsSelected &&
            whetherTheCallWasMadeIsSelected &&
            whetherTicketNeedsFollowUpIsSelected &&
            whenNotHiddenCEVNeedsAreSelected
        );
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
            helpNeeded: helpNeeded,
            helpNeededSubtype: helpNeededSubtype
        };

        if (helpNeeded === 'CEV') {
            (helpRequestObject.helpWithAccessingFood = cevHelpNeeds.foodAccessVoluntarySector),
                (helpRequestObject.helpWithAccessingSupermarketFood =
                    cevHelpNeeds.prioritySupermarketFoodDelivery),
                (helpRequestObject.helpWithCompletingNssForm =
                    cevHelpNeeds.supportCompletingNSSForm),
                (helpRequestObject.helpWithShieldingGuidance = cevHelpNeeds.generalCEVGuidance),
                (helpRequestObject.helpWithAccessingOtherEssentials = cevHelpNeeds.otherNeeds),
                (helpRequestObject.helpWithNoNeedsIdentified = cevHelpNeeds.noNeedsIdentified);
        }

        // jeez, this looks sooo fragile
        if (
            mandatoryFieldsWereGivenInput() &&
            validateSelfIsolationNeedsFieldset() &&
            ((callMade == true &&
                callOutcomeValues.length > 1 &&
                callDirection != null &&
                helpNeeded != null &&
                ((email != null && showEmail) || !showEmail) &&
                ((phoneNumber != null && showText) || !showText)) ||
                (callMade == false &&
                    helpNeeded &&
                    followUpRequired != null &&
                    ((email != null && showEmail) || !showEmail) &&
                    ((phoneNumber != null && showText) || !showText)) ||
                (followUpRequired != null &&
                    caseNote != '' &&
                    helpNeeded != null &&
                    helpNeeded != '' &&
                    ((email != null && showEmail) || !showEmail) &&
                    ((phoneNumber != null && showText) || !showText)))
        ) {
            setSubmitEnabled(false);
            saveFunction(
                helpNeeded,
                callDirection,
                callOutcomeValues,
                helpRequestObject,
                callMade,
                caseNote,
                notifyRequestOptionsConstructor(helpNeeded, phoneNumber, email)
            );
        } else {
            setErrorsExist(true); // generic error, user won't be told what's wrong.
            window.scrollTo(0, 0);
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
                <br />
                {helpRequest && (
                    <strong
                        data-testid="help-type"
                        className={`govuk-tag govuk-tag--grey ${styles['help-request-tag']}`}>
                        {helpRequest?.helpNeeded == 'Welfare Call'
                            ? 'Self Isolation'
                            : formatSubText(
                                  helpRequest?.helpNeeded,
                                  helpRequest?.helpNeededSubtype
                              )}
                    </strong>
                )}
                <br></br>
                {helpRequest && (
                    <span className="govuk-caption-l">
                        <strong>Date requested: </strong>{' '}
                        {helpRequest?.dateTimeRecorded?.split('T')[0]}
                    </span>
                )}
                {nhsCtasId}
                {metadata}
                <div className="govuk-!-margin-top-5">
                    <a href={process.env.NEXT_PUBLIC_SNAPSHOT_URL} target="_blank" rel="noopener noreferrer">
                        <Button text="Open Better Conversations" />
                        <svg width="24px" height="24px" viewBox="0 0 24 24">
                            <g
                                id="external_link"
                                className="icon_svg-stroke"
                                stroke="#666"
                                strokeWidth="1.5"
                                fill="none"
                                fillRule="evenodd"
                                strokeLinecap="round"
                                strokeLinejoin="round">
                                <polyline points="17 13.5 17 19.5 5 19.5 5 7.5 11 7.5"></polyline>
                                <path d="M14,4.5 L20,4.5 L20,10.5 M20,4.5 L11,13.5"></path>
                            </g>
                        </svg>
                    </a>
                    <p className={`${styles['button-hint']}`}>
                        Opens in new tab. Please note that information from Better Conversations
                        will not currently be saved to the resident&apos;s profile.
                    </p>
                </div>
            </h1>
            <form>
                <div>
                    <div className="govuk-grid-column">
                        <div className="govuk-form-group lbh-form-group">
                            <div>
                                <div className="govuk-grid-column">
                                    <div className="govuk-form-group lbh-form-group">
                                        {!helpRequestExists && (
                                            <fieldset className="govuk-fieldset">
                                                <legend className="govuk-fieldset__legend mandatoryQuestion">
                                                    {' '}
                                                    Support required
                                                </legend>
                                                <br />
                                                {
                                                    <RadioButton
                                                        radioButtonItems={callTypes}
                                                        name="HelpNeeded"
                                                        onSelectOption={callBackFunction}
                                                        data-testid="call-type-radio-button"
                                                    />
                                                }

                                                {subTypesDropdown.length > 0 && (
                                                    <fieldset className="govuk-fieldset">
                                                        <h3 className="govuk-heading-m">
                                                            {' '}
                                                            {helpNeeded} Category
                                                        </h3>

                                                        <Dropdown
                                                            onChange={updateSubTypeSelection}
                                                            dropdownItems={subTypesDropdown}
                                                            data-testid="subtype-dropdown"
                                                        />
                                                    </fieldset>
                                                )}
                                            </fieldset>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <br />
                            {helpNeeded === 'CEV' && (
                                <fieldset
                                    className="govuk-fieldset govuk-!-margin-bottom-7"
                                    data-testid="cev-help-needs">
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
                                            data-testid="call-type-yes-radio-button"
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
                                                                data-testid="yes-spoke-to-resident"
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
                                                                                    spokeToResidentCallOutcome, index
                                                                                ) => {
                                                                                    return (
                                                                                        <Checkbox
                                                                                            key={"spokeToResidentCallOutcome-" + index}
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
                                                                                            }
                                                                                            data-testid={`${spokeToResidentCallOutcome.value}-checkbox`}></Checkbox>
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
                                                                                noAnswerCallOutcome, index
                                                                            ) => {
                                                                                return (
                                                                                    <Checkbox
                                                                                        key={"noAnswerCallOutcome-" + index}
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
                                            {callOutcomeValues.includes('callback_complete') &&
                                                selfIsolationCallTypes.includes(helpNeeded) && (
                                                    <div
                                                        className="govuk-form-group lbh-form-group"
                                                        data-testid="self-isolation-needs">
                                                        <fieldset className="govuk-fieldset">
                                                            <legend className="govuk-fieldset__legend mandatoryQuestion">
                                                                {' '}
                                                                Did the resident require any
                                                                support?{' '}
                                                            </legend>
                                                            {selfIsolationNeeds.map(
                                                                (selfIsolationNeed, index) => {
                                                                    return (
                                                                        <Checkbox
                                                                            key={"selfIsolationNeeds-" + index}
                                                                            id={
                                                                                selfIsolationNeed.name
                                                                            }
                                                                            name="selfIsolationNeeds"
                                                                            type="checkbox"
                                                                            value={
                                                                                selfIsolationNeed.value
                                                                            }
                                                                            label={
                                                                                selfIsolationNeed.name
                                                                            }
                                                                            onCheckboxChange={
                                                                                onCheckboxChangeUpdate
                                                                            }></Checkbox>
                                                                    );
                                                                }
                                                            )}
                                                        </fieldset>
                                                    </div>
                                                )}
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
                                                        data-testid="call-direction-radio-button"
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
                {editableCaseNotes && (
                    <>
                        <h3 className="govuk-heading-m">Add a new case note (optional):</h3>
                        <div className="govuk-form-group">
                            <span id="NewCaseNote-hint" className="govuk-hint  lbh-hint"></span>
                            <textarea
                                className="govuk-textarea  lbh-textarea"
                                id="NewCaseNote"
                                name="NewCaseNote"
                                rows="5"
                                onChange={(e) => {
                                    setCaseNote(e.target.value);
                                }}
                                aria-describedby="NewCaseNote-hint"></textarea>
                        </div>
                    </>
                )}
                <br></br>

                {helpNeeded && helpNeeded !== LINK_WORK && (
                    <fieldset className="govuk-fieldset">
                        <h3 className="govuk-heading-m">
                            Would you like to message the resident following this call?
                        </h3>

                        <Checkbox
                            id="SendEmail"
                            name="SendEmail"
                            data-testid="send-email-checkbox"
                            type="checkbox"
                            value={TEST_AND_TRACE_FOLLOWUP_EMAIL}
                            label="Send Email"
                            aria-describedby="SendEmail"
                            onCheckboxChange={(val) => {
                                fetchTemplates();
                                setShowContactDetails(val);
                            }}></Checkbox>
                        {showEmail && (
                            <div
                                className="govuk-radios__conditional govuk-radios__conditional--hidden"
                                id="conditional-contact">
                                <br />
                                {emailTemplatePreview && (
                                    <div className="govuk-form-group">
                                        <div>
                                            <label
                                                className="govuk-label mandatoryQuestion"
                                                htmlFor="contact-by-email">
                                                Email address
                                            </label>
                                            <input
                                                className="govuk-input govuk-!-width-one-third"
                                                id="contact-by-email"
                                                name="contact-by-email"
                                                type="email"
                                                spellCheck="false"
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </div>
                                        <br />
                                        <br />
                                        <div id="contact-hint" className="govuk-hint">
                                            Email preview
                                        </div>
                                        <p
                                            id="email-template-preview"
                                            className={`govuk-inset-text ${cbCSS['template-text']}`}
                                            data-testid="send-email-preview">
                                            {emailTemplatePreview}
                                        </p>
                                    </div>
                                )}
                                {!emailTemplatePreview && (
                                    <div className="govuk-warning-text">
                                        <span
                                            className="govuk-warning-text__icon"
                                            aria-hidden="true">
                                            !
                                        </span>
                                        <strong className="govuk-warning-text__text">
                                            <span className="govuk-warning-text__assistive">
                                                Warning
                                            </span>
                                            There is no email option for this call type, please
                                            uncheck this option to proceed
                                        </strong>
                                    </div>
                                )}
                                <br />
                            </div>
                        )}
                        <Checkbox
                            id="SendText"
                            name="SendText"
                            type="checkbox"
                            data-testid="send-text-checkbox"
                            value={TEST_AND_TRACE_FOLLOWUP_TEXT}
                            label="Send Text"
                            aria-describedby="SendEmail"
                            onCheckboxChange={(val) => {
                                fetchTemplates();
                                setShowContactDetails(val);
                            }}></Checkbox>
                        {showText && (
                            <div
                                className="govuk-radios__conditional govuk-radios__conditional--hidden"
                                id="conditional-contact-3">
                                <br />
                                {textTemplatePreview && (
                                    <div className="govuk-form-group">
                                        <div>
                                            <label
                                                className="govuk-label mandatoryQuestion"
                                                htmlFor="contact-by-text">
                                                Mobile phone number
                                            </label>
                                            <input
                                                className="govuk-input govuk-!-width-one-third"
                                                id="contact-by-text"
                                                name="contact-by-text"
                                                type="tel"
                                                onChange={(e) => {
                                                    setPhoneNumber(e.target.value);
                                                }}
                                            />
                                        </div>
                                        <br />
                                        <br />
                                        <div id="contact-hint" className="govuk-hint">
                                            Text preview
                                        </div>
                                        <p
                                            className={`govuk-inset-text ${cbCSS['template-text']}`}
                                            data-testid="send-text-preview">
                                            {textTemplatePreview}
                                        </p>
                                    </div>
                                )}
                                <br />
                                {!textTemplatePreview && (
                                    <div className="govuk-warning-text">
                                        <span
                                            className="govuk-warning-text__icon"
                                            aria-hidden="true">
                                            !
                                        </span>
                                        <strong className="govuk-warning-text__text">
                                            <span className="govuk-warning-text__assistive">
                                                Warning
                                            </span>
                                            There is no text option for this call type, please
                                            uncheck this option to proceed
                                        </strong>
                                    </div>
                                )}
                                <br />
                            </div>
                        )}
                        <br />
                    </fieldset>
                )}
                <br />
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
                                onSelectOption={followUpRequiredFunction}
                                data-testid="followup-required-radio-button"
                            />
                        </fieldset>
                    </div>
                </div>
                <div id="btn-bottom-panel">
                    <div className="govuk-grid-column">
                        <Button
                            text="Update"
                            type="submit"
                            addClass="govuk-!-margin-right-1"
                            onClick={(event) => {
                                handleUpdate(event); // change this to the "onSubmit like with the resident"
                            }}
                            disabled={!submitEnabled}
                            data-testid="callback-form-update_button"
                        />
                        <Link href={backHref}>
                            <Button
                                text="Cancel"
                                type="button"
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
