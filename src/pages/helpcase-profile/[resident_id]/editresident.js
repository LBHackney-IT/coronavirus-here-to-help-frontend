import React from "react";
import Layout from "../../../components/layout";
import KeyInformation from "../../../components/KeyInformation/KeyInformation";
import { useRouter } from "next/router";
import { ResidentGateway } from "../../../gateways/resident";

export default function HelpcaseProfile({ resident_id, resident }) {
  return (
    <Layout>
      <div class="govuk-grid-column-one-quarter-from-desktop">
        <KeyInformation resident={resident} />
      </div>
      <div class="govuk-grid-column-three-quarters-from-desktop">
        <h2 class="govuk-heading-l">
          {resident.FirstName} {resident.LastName}
        </h2>
        <h2 class="govuk-heading-m">Update resident profile</h2>

        <div class="govuk-grid-row">
          <div class="govuk-grid-column-one-half">
            <fieldset class="govuk-fieldset lbh-fieldset">
              <legend class="govuk-fieldset__legend">First name</legend>
              <br />
            </fieldset>
            <div class="govuk-form-group lbh-form-group">
              <input
                class="govuk-input  lbh-input"
                id="FirstName"
                name="FirstName"
                type="text"
                style={{
                  marginBottom: "20px"
                }}
              />
            </div>
          </div>
          <div class="govuk-grid-column-one-half">
            <fieldset class="govuk-fieldset lbh-fieldset">
              <legend
                class="govuk-fieldset__legend"
                style={{
                  marginBottom: "30px"
                }}
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
                style={{
                  marginBottom: "20px"
                }}
              />
            </div>
          </div>
        </div>
        <div class="govuk-grid-row">
          <div class="govuk-grid-column-one-half">
            <h3 class="lbh-heading-h3">Contact telephone</h3>
            <br />
            <div class="govuk-form-group lbh-form-group">
              <input
                class="govuk-input  lbh-input"
                id="ContactTelephoneNumber"
                name="ContactTelephoneNumber"
                type="tel"
                style={{
                  marginBottom: "20px"
                }}
              />
            </div>
          </div>
          <div class="govuk-grid-column-one-half">
            <h3 class="lbh-heading-h3">Contact mobile (Optional)</h3>
            <br />
            <div class="govuk-form-group lbh-form-group">
              <input
                class="govuk-input  lbh-input"
                id="ContactMobileNumber"
                name="ContactMobileNumber"
                type="tel"
                style={{
                  marginBottom: "20px"
                }}
              />
            </div>
          </div>
        </div>
        <div class="govuk-grid-row">
          <div class="govuk-grid-column-one-half">
            <h3 class="lbh-heading-h3">Email address (Optional)</h3>
            <br />
            <div class="govuk-form-group lbh-form-group">
              <input
                class="govuk-input  lbh-input"
                id="EmailAddress"
                name="EmailAddress"
                type="text"
                style={{
                  marginBottom: "20px"
                }}
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
                <label class="govuk-label govuk-date-input__label" for="DobDay">
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
        <hr class="govuk-section-break govuk-section-break--m govuk-section-break--visible" />
      </div>
    </Layout>
  );
}

HelpcaseProfile.getInitialProps = async ({
  query: { resident_id },
  req,
  res
}) => {
  try {
    const gateway = new ResidentGateway();
    const resident = await gateway.getResident(resident_id);

    return {
      resident_id,
      resident
    };
  } catch (err) {
    console.Console(
      `Error getting resident props with help request ID ${resident_id}: ${err}`
    );
  }
};
