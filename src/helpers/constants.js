export const NOT_ASSIGNED = 'Not assigned';
export const CEV = 'CEV';
export const SHIELDING = 'Shielding';
export const CONTACT_TRACING = 'Contact Tracing';
export const HELP_REQUEST = 'Help Request';
export const WELFARE_CALL = 'Welfare Call';
export const ALL = 'All';
export const LINK_WORK = 'Link Work';
export const EUSS = 'EUSS';
export const DEFAULT_DROPDOWN_OPTION = 'Please choose';
export const IS_EUSS_ENABLED = true;
export const EUSS_GROUP = 'Here To Help EUSS Outbound Calls';
export const REPAIRS = 'Repairs';

export const callOutcomes = {
    callback_complete: 'Callback complete',
    refused_to_engage: 'Refused to engage',
    call_rescheduled: 'Call rescheduled',
    voicemail: 'Voicemail left',
    wrong_number: 'Wrong number',
    no_answer_machine: 'No answer machine',
    food_consortia_referral_needs: 'Yes, the resident needed a referral to the food consortia',
    other_support_needs: 'Yes, the resident had other support needs',
    no_support_needs: 'No, the resident did not require support'
};

export const selfIsolationCallTypes = [WELFARE_CALL, CONTACT_TRACING];
export const bulkMessageCallTypes = [WELFARE_CALL, CONTACT_TRACING, EUSS, LINK_WORK];

export const cevHelpTypes = {
    foodAccessVoluntarySector: 'Accessing food via voluntary sector',
    prioritySupermarketFoodDelivery: 'Accessing food via priority supermarket delivery',
    supportCompletingNSSForm: 'Support completing NSS form',
    generalCEVGuidance: 'General guidance about Shielding',
    otherNeeds: 'Other needs',
    noNeedsIdentified: 'No needs identified'
};

// some of these are included within the grouping object, but their usage is not changed to point to object within code.
export const TEST_AND_TRACE_FOLLOWUP_TEXT = 'test-and-trace-followup-text'; // included into object
export const TEST_AND_TRACE_FOLLOWUP_EMAIL = 'test-and-trace-followup-email'; // included into object
export const PRE_CALL_MESSAGE_TEMPLATE = 'pre-call-message-template';
export const SELF_ISOLATION_PRE_CALL_MESSAGE_TEMPLATE = 'self-isolation-pre-call-message-template';
export const EUSS_PRE_CALL_MESSAGE_TEMPLATE = 'euss-pre-call-message-template'; // included into object
export const LINK_WORK_BULK_MESSAGE_TEMPLATE = 'link-work-bulk-message-template';

// currently contains duplicate, but ideally, after refactoring the other ones get
// removed. The code becomes much clearer, when the constants are grouped.
export const TEMPLATE_ID_ALIASES = {
    EUSS_SMS_FOLLOW_UP_NO_ANSWER_TEMPLATE: 'euss-sms-follow-up-no-answer',
    EUSS_PRE_CALL_MESSAGE_TEMPLATE: 'euss-pre-call-message-template', // sms
    EUSS_EMAIL_PRE_CALL_TEMPLATE: 'euss-pre-call-email', // email
    TEST_AND_TRACE_FOLLOWUP_EMAIL: 'test-and-trace-followup-email',
    TEST_AND_TRACE_FOLLOWUP_TEXT: 'test-and-trace-followup-text'
};

// Creating duplicate constants for now:
// I'm hoping to have them refactored in the future.
export const HELP_TYPE = {
    CEV: 'CEV',
    SHIELDING: 'Shielding',
    CONTACT_TRACING: 'Contact Tracing',
    HELP_REQUEST: 'Help Request',
    WELFARE_CALL: 'Welfare Call',
    LINK_WORK: 'Link Work',
    EUSS: 'EUSS',
    REPAIRS: 'Repairs'
};

export const CONTACT_TYPE = {
    EMAIL: 'EMAIL',
    SMS_TEXT: 'SMS_TEXT'
};

