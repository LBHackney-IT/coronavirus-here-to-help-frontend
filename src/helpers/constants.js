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
export const IS_EUSS_ENABLED = false;

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

export const helpTypes = [
    ALL,
    WELFARE_CALL,
    HELP_REQUEST,
    CONTACT_TRACING,
    CEV,
    LINK_WORK,
    ...(IS_EUSS_ENABLED ? ['EUSS'] : [])
];
export const callTypes = ['All', 'Help Request', 'CEV', 'Welfare Call', 'Contact Tracing'];
export const selfIsolationCallTypes = [WELFARE_CALL, CONTACT_TRACING];

export const cevHelpTypes = {
    foodAccessVoluntarySector: 'Accessing food via voluntary sector',
    prioritySupermarketFoodDelivery: 'Accessing food via priority supermarket delivery',
    supportCompletingNSSForm: 'Support completing NSS form',
    generalCEVGuidance: 'General guidance about Shielding',
    otherNeeds: 'Other needs',
    noNeedsIdentified: 'No needs identified'
};

export const TEST_AND_TRACE_FOLLOWUP_TEXT = 'test-and-trace-followup-text';
export const TEST_AND_TRACE_FOLLOWUP_EMAIL = 'test-and-trace-followup-email';
export const PRE_CALL_MESSAGE_TEMPLATE = 'pre-call-message-template';
export const SELF_ISOLATION_PRE_CALL_MESSAGE_TEMPLATE = 'self-isolation-pre-call-message-template';
