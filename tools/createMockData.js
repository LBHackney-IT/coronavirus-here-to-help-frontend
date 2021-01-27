const faker = require('faker');
const randexp = require('randexp').randexp;

faker.locale = 'en';

const randomNullableBool = () => (Math.random() > 2 / 3 ? faker.random.boolean() : null);

const randomArrayItem = (collection) => collection[Math.floor(Math.random() * collection.length)];

function nItems(quantity, f, ...args) {
    const collection = [];
    for (let q = quantity; q > 0; q--) collection.push(f(...args));
    return collection;
}

const randomInt = (maxN) => Math.floor(Math.random() * maxN + 1);

function createCaseNote(autoincrId, residentId, helpReqId) {
    return {
        id: autoincrId,
        CaseNote: faker.lorem.words(),
        HelpRequestId: helpReqId, // name change so the relationships would work
        residentId: residentId, // same here
        CreatedAt: faker.date.recent(40)
    };
}

function createHelpRequestCall(autoincrId, HelpRequestId, callbackRequired) {
    const callOutcomeExp = callbackRequired
        ? /((callback_complete|call_rescheduled|no_answer_machine)(,follow_up_requested)?)|follow_up_requested/
        : /(refused_to_engage|wrong_number)(callback_complete)?/;
    return {
        id: autoincrId,
        HelpRequestId: HelpRequestId,
        CallType: randexp(/Contact Tracing|Shielding|Welfare|Help Request/),
        CallDirection: randexp(/outbound|inbound/),
        CallOutcome: randexp(callOutcomeExp),
        CallDateTime: faker.date.recent(40)
    };
}

function createResident(autoincrId) {
    const firstname = faker.name.firstName();
    const lastname = faker.name.lastName();
    return {
        id: autoincrId,
        FirstName: firstname,
        LastName: lastname,
        AddressFirstLine: `Flat ${randexp(/[1-9][A-F]?/)}`,
        AddressSecondLine: faker.address.streetAddress(),
        AddressThirdLine: Math.random() > 0.1 ? '' : randexp(/Hackney(, London)?/),
        ConsentToShare: randomNullableBool(),
        ContactMobileNumber: randexp(/07\d{9}/),
        ContactTelephoneNumber: randexp(/020\d{8}/),
        DateOfBirth: faker.date.past(70),
        EmailAddress: faker.internet.email(firstname, lastname),
        GpSurgeryDetails: faker.random.number(), // got no clue what this is
        IsPharmacistAbleToDeliver: randomNullableBool(),
        NameAddressPharmacist: `${faker.company.companyName()}, ${faker.address.streetAddress()}`, //is this correct?
        NhsNumber: randexp(/\d{10}/),
        NumberOfChildrenUnder18: randexp(/[0-5]/),
        PostCode: randexp(/[A-Z]{1,2}\d ?\d[A-Z]{2}/),
        RecordStatus: Math.random() > 0.2 ? 'MASTER' : 'DUPLICATE',
        Uprn: randexp(/1000\d{7}/),
        Ward: faker.random.word()
    };
}

function createHelpRequest(autoincrId, ResidentId, callHandlersList) {
    // Assigned call handler
    const assignedCallHandler = randomArrayItem(callHandlersList);

    // On behalf:
    let isOnBehalf = randomNullableBool();
    consentToCompleteOnBehalf = null;
    onBehalfContactNumber = '';
    onBehalfEmailAddress = '';
    onBehalfFirstName = '';
    onBehalfLastName = '';
    relationshipWithResident = '';

    if (isOnBehalf) {
        consentToCompleteOnBehalf = true;
        onBehalfFirstName = faker.name.firstName();
        onBehalfLastName = faker.name.lastName();
        onBehalfEmailAddress = faker.internet.email(onBehalfFirstName, onBehalfLastName);
        onBehalfContactNumber = randexp(/07\d{9}/);
        relationshipWithResident = faker.lorem.word();
    }
 
    // Callback Required:
    const callbackRequired = Math.random() > 0.5 ? randomNullableBool() : true;
    const id = autoincrId;

    return {
        id,
        ResidentId: ResidentId, // name change so the relationships would work
        AssignedTo: assignedCallHandler,
        AdviceNotes: faker.lorem.words(),
        CallbackRequired: callbackRequired,
        CurrentSupport: faker.random.word(), // no idea what this is!
        CurrentSupportFeedback: faker.lorem.words(5),
        DateTimeRecorded: faker.date.recent(40),
        GettingInTouchReason: faker.lorem.words(3), // no idea what the values here should be like
        HelpNeeded: randexp(/Contact Tracing|Shielding|Welfare|Help Request/), //is this correct?
        HelpWithAccessingFood: randomNullableBool(),
        HelpWithAccessingInternet: randomNullableBool(),
        HelpWithAccessingMedicine: randomNullableBool(),
        MedicineDeliveryHelpNeeded: randomNullableBool(),
        HelpWithCompletingNssForm: randomNullableBool(),
        HelpWithShieldingGuidance: randomNullableBool(),
        HelpWithAccessingOtherEssentials: randomNullableBool(),
        HelpWithNoNeedsIdentified: randomNullableBool(),
        HelpWithChildrenAndSchools: randomNullableBool(),
        HelpWithDebtAndMoney: randomNullableBool(),
        HelpWithDisabilities: randomNullableBool(),
        HelpWithHealth: randomNullableBool(),
        HelpWithHousing: randomNullableBool(),
        HelpWithJobsOrTraining: randomNullableBool(),
        HelpWithMentalHealth: randomNullableBool(),
        HelpWithSomethingElse: randomNullableBool(),
        InitialCallbackCompleted: randomNullableBool(),
        IsOnBehalf: isOnBehalf,
        ConsentToCompleteOnBehalf: consentToCompleteOnBehalf,
        OnBehalfFirstName: onBehalfFirstName,
        OnBehalfLastName: onBehalfLastName,
        OnBehalfEmailAddress: onBehalfEmailAddress,
        OnBehalfContactNumber: onBehalfContactNumber,
        RecordStatus: Math.random() > 0.2 ? 'MASTER' : 'DUPLICATE', // Do we really have this for Resident & Help Request?
        RelationshipWithResident: relationshipWithResident,
        UrgentEssentials: Math.random() < 0.2 ? faker.lorem.words(5) : '',
        UrgentEssentialsAnythingElse: Math.random() < 0.2 ? faker.lorem.words(5) : '',
        WhenIsMedicinesDelivered: Math.random() < 0.2 ? faker.date.weekday() : '',
        RescheduledAt: callbackRequired ? randexp(/((0\d)|(1\d)|(2[0-3])):[0-5]\d/) : '',
        RequestedDate: faker.date.soon(7),
    };
}

function createCallHandler() {
    let letters = ["A", "B", "C", "D"];
    return `Person ` + letters[Math.ceil(Math.random()*4)-1];
}

function dataGenerator(residnts = 30, hreqsPerRes = 5, cnotesPerHR = 2, callHandlerQ = 15) {
    const callHandlers = [];
    const residents = [];
    const helpRequests = [];
    const CaseNotes = [];
    const HelpRequestCalls = [];

    for (let ch = 1; ch <= callHandlerQ; ch++) {
        callHandlers.push(createCallHandler());
    }

    for (let r = 1; r <= residnts; r++) {
        residents.push(createResident(r));
        for (let hr = 1; hr <= hreqsPerRes; hr++) {
            let help_request_id = hr + (r - 1) * hreqsPerRes;
            let help_request = createHelpRequest(help_request_id, r, callHandlers);
            helpRequests.push(help_request);
            for (let cn = 1; cn <= cnotesPerHR; cn++) {
                let case_note_id =
                    cn + (hr - 1) * cnotesPerHR + (r - 1) * cnotesPerHR * hreqsPerRes;
                CaseNotes.push(createCaseNote(case_note_id, r, help_request_id));
            }
            //keeping it separate so it would be easier to follow
            for (let hrc = 1; hrc <= cnotesPerHR; hrc++) {
                //keeping case notes and calls quantity equal
                let help_request_call_id =
                    hrc + (hr - 1) * cnotesPerHR + (r - 1) * cnotesPerHR * hreqsPerRes;
                HelpRequestCalls.push(
                    createHelpRequestCall(
                        help_request_call_id,
                        help_request_id,
                        help_request.CallbackRequired
                    )
                );
            }
        }
    }

    return {
        residents,
        helpRequests,
        CaseNotes,
        HelpRequestCalls,
        help_request_calls: HelpRequestCalls,
        callHandlers
    };
}

module.exports = { dataGenerator };
