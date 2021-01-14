const faker = require("faker");
const randexp = require("randexp").randexp;

faker.locale = "en";

const residents = [];

const randomNullableBool = () =>
  Math.random() > 2 / 3 ? faker.random.boolean() : null;

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
//case_notes: nItems(5, , 10)

