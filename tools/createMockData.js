const faker = require("faker");
const randexp = require("randexp").randexp;

faker.locale = "en";

const randomNullableBool = () =>
  Math.random() > 2 / 3 ? faker.random.boolean() : null;

const randomArrayItem = (collection) =>
  collection[Math.floor(Math.random() * collection.length)];

function createCaseNote(autoincrId, residentId, helpReqId) {
  return {
    id: autoincrId,
    case_notes: faker.lorem.words(),
    help_requestId: helpReqId, // name change so the relationships would work
    residentId: residentId, // same here
    created_at: faker.date.recent(40),
  };
}

function createHelpRequestCall(autoincrId, helpRequestId, callbackRequired) {
  const callOutcomeExp = callbackRequired
    ? /((callback_complete|call_rescheduled|no_answer_machine)(,follow_up_requested)?)|follow_up_requested/
    : /(refused_to_engage|wrong_number)(callback_complete)?/;
  return {
    id: autoincrId,
    help_requestId: helpRequestId,
    call_type: randexp(/Contact Tracing|Shielding|Welfare|Help Request/),
    call_direction: randexp(/outbound|inbound/),
    call_outcome: randexp(callOutcomeExp),
    call_date_time: faker.date.recent(40),
  };
}

function createResident(autoincrId) {
  const firstname = faker.name.firstName();
  const lastname = faker.name.lastName();
  return {
    id: autoincrId,
    first_name: firstname,
    last_name: lastname,
    address_first_line: `Flat ${randexp(/[1-9][A-F]?/)}`,
    address_second_line: faker.address.streetAddress(),
    address_third_line:
      Math.random() > 0.1 ? "" : randexp(/Hackney(, London)?/),
    consent_to_share: randomNullableBool(),
    contact_mobile_number: randexp(/07\d{9}/),
    contact_telephone_number: randexp(/020\d{8}/),
    date_of_birth: faker.date.past(70),
    email_address: faker.internet.email(firstname, lastname),
    gp_surgery_details: faker.random.number(), // got no clue what this is
    is_pharmacist_able_to_deliver: randomNullableBool(),
    name_address_pharmacist: `${faker.company.companyName()}, ${faker.address.streetAddress()}`, //is this correct?
    nhs_number: randexp(/\d{10}/),
    number_of_children_under_18: randexp(/[0-5]/),
    postcode: randexp(/[A-Z]{1,2}\d ?\d[A-Z]{2}/),
    record_status: Math.random() > 0.2 ? "MASTER" : "DUPLICATE",
    uprn: randexp(/1000\d{7}/),
    ward: faker.random.word(),
  };
}

function createHelpRequest(autoincrId, residentId, callHandlersList) {
  // Assigned call handler
  const assignedCallHandler = randomArrayItem(callHandlersList);

  // On behalf:
  let isOnBehalf = randomNullableBool();
  consentToCompleteOnBehalf = null;
  onBehalfContactNumber = "";
  onBehalfEmailAddress = "";
  onBehalfFirstName = "";
  onBehalfLastName = "";
  relationshipWithResident = "";

  if (isOnBehalf) {
    consentToCompleteOnBehalf = true;
    onBehalfFirstName = faker.name.firstName();
    onBehalfLastName = faker.name.lastName();
    onBehalfEmailAddress = faker.internet.email(
      onBehalfFirstName,
      onBehalfLastName
    );
    onBehalfContactNumber = randexp(/07\d{9}/);
    relationshipWithResident = faker.lorem.word();
  }

  // Callback Required:
  const callbackRequired = Math.random() > 0.5 ? randomNullableBool() : true;

  return {
    id: autoincrId,
    residentId: residentId, // name change so the relationships would work
    assigned_to: assignedCallHandler,
    advice_notes: faker.lorem.words(),
    callback_required: callbackRequired,
    current_support: faker.random.word(), // no idea what this is!
    current_support_feedback: faker.lorem.words(5),
    date_time_recorded: faker.date.recent(40),
    getting_in_touch_reason: faker.lorem.words(3), // no idea what the values here should be like
    help_needed: randexp(/Contact Tracing|Shielding|Welfare|Help Request/), //is this correct?
    help_with_accessing_food: randomNullableBool(),
    help_with_accessing_internet: randomNullableBool(),
    help_with_accessing_medicine: randomNullableBool(),
    medicine_delivery_help_needed: randomNullableBool(),
    help_with_accessing_other_essentials: randomNullableBool(),
    help_with_children_and_schools: randomNullableBool(),
    help_with_debt_and_money: randomNullableBool(),
    help_with_disabilities: randomNullableBool(),
    help_with_health: randomNullableBool(),
    help_with_housing: randomNullableBool(),
    help_with_jobs_or_training: randomNullableBool(),
    help_with_mental_health: randomNullableBool(),
    help_with_something_else: randomNullableBool(),
    initial_callback_completed: randomNullableBool(),
    is_on_behalf: isOnBehalf,
    consent_to_complete_on_behalf: consentToCompleteOnBehalf,
    on_behalf_first_name: onBehalfFirstName,
    on_behalf_last_name: onBehalfLastName,
    on_behalf_email_address: onBehalfEmailAddress,
    on_behalf_contact_number: onBehalfContactNumber,
    record_status: Math.random() > 0.2 ? "MASTER" : "DUPLICATE", // Do we really have this for Resident & Help Request?
    relationship_with_resident: relationshipWithResident,
    urgent_essentials: Math.random() < 0.2 ? faker.lorem.words(5) : "",
    urgent_essentials_anything_else:
      Math.random() < 0.2 ? faker.lorem.words(5) : "",
    when_is_medicines_delivered:
      Math.random() < 0.2 ? faker.date.weekday() : "",
    rescheduled_at: callbackRequired
      ? randexp(/((0\d)|(1\d)|(2[0-3])):[0-5]\d/)
      : "",
    requested_date: faker.date.soon(7),
  };
}

function createCallHandler() {
  return `${faker.name.firstName()} ${faker.name.lastName()}`;
}

function dataGenerator(
  residnts = 30,
  hreqsPerRes = 5,
  cnotesPerHR = 2,
  callHandlerQ = 15
) {
  const call_handlers = [];
  const residents = [];
  const help_requests = [];
  const case_notes = [];
  const help_request_calls = [];

  for (let ch = 1; ch <= callHandlerQ; ch++) {
    call_handlers.push(createCallHandler());
  }

  for (let r = 1; r <= residnts; r++) {
    residents.push(createResident(r));
    for (let hr = 1; hr <= hreqsPerRes; hr++) {
      let help_request_id = hr + (r - 1) * hreqsPerRes;
      let help_request = createHelpRequest(help_request_id, r, call_handlers);
      help_requests.push(help_request);
      for (let cn = 1; cn <= cnotesPerHR; cn++) {
        let case_note_id =
          cn + (hr - 1) * cnotesPerHR + (r - 1) * cnotesPerHR * hreqsPerRes;
        case_notes.push(createCaseNote(case_note_id, r, help_request_id));
      }
      //keeping it separate so it would be easier to follow
      for (let hrc = 1; hrc <= cnotesPerHR; hrc++) {
        //keeping case notes and calls quantity equal
        let help_request_call_id =
          hrc + (hr - 1) * cnotesPerHR + (r - 1) * cnotesPerHR * hreqsPerRes;
        help_request_calls.push(
          createHelpRequestCall(
            help_request_call_id,
            help_request_id,
            help_request.callback_required
          )
        );
      }
    }
  }

  return {
    residents,
    help_requests,
    case_notes,
    help_request_calls,
    call_handlers,
  };
}

module.exports = { dataGenerator };
