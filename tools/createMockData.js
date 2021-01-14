const faker = require("faker");
const randexp = require("randexp").randexp;

faker.locale = "en";

const randomNullableBool = () =>
  Math.random() > 2 / 3 ? faker.random.boolean() : null;

function createCaseNote(autoincrId, residentId, helpReqId) {
  return {
    id: autoincrId,
    case_notes: faker.lorem.words(),
    help_requestId: helpReqId, // name change so the relationships would work
    residentId: residentId, // same here
    created_at: faker.date.recent(40),
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

function createHelpRequest(autoincrId, residentId) {
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

  return {
    id: autoincrId,
    residentId: residentId, // name change so the relationships would work
    advice_notes: faker.lorem.words(),
    callback_required: randomNullableBool(),
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
  };
}

function dataGenerator(residnts = 30, hreqsPerRes = 5, cnotesPerHR = 2) {
  const residents = [];
  const help_requests = [];
  const case_notes = [];

  for (let r = 1; r <= residnts; r++) {
    residents.push(createResident(r));
    for (let hr = 1; hr <= hreqsPerRes; hr++) {
      help_requests.push(createHelpRequest(hr + (r - 1) * hreqsPerRes, r));
      for (let cn = 1; cn <= cnotesPerHR; cn++) {
        case_notes.push(
          createCaseNote(
            cn + (hr - 1) * cnotesPerHR + (r - 1) * cnotesPerHR * hreqsPerRes,
            r,
            hr
          )
        );
      }
    }
  }

  return { residents, help_requests, case_notes };
}

module.exports = { dataGenerator };
