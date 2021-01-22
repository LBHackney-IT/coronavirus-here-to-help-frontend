import React from 'react';

export default function EditResidentBioForm({resident, onChange}) {
    return (<>
        <h2 class="govuk-heading-l">
          {resident.firstName} {resident.lastName}
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
                id="firstName"
                name="firstName"
                type="text"
                style={{
                  marginBottom: "20px"
                }}
                defaultValue={resident.firstName}
                onChange={(e) => onChange(e.target.id, e.target.value)}
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
                id="lastName"
                name="lastName"
                type="text"
                style={{
                  marginBottom: "20px"
                }}
                defaultValue={resident.lastName}
                onChange={(e) => onChange(e.target.id, e.target.value)}
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
                id="contactTelephoneNumber"
                name="contactTelephoneNumber"
                type="tel"
                style={{
                  marginBottom: "20px"
                }}
                defaultValue={resident.contactTelephoneNumber}
                onChange={(e) => onChange(e.target.id, e.target.value)}
              />
            </div>
          </div>
          <div class="govuk-grid-column-one-half">
            <h3 class="lbh-heading-h3">Contact mobile (Optional)</h3>
            <br />
            <div class="govuk-form-group lbh-form-group">
              <input
                class="govuk-input  lbh-input"
                id="contactMobileNumber"
                name="contactMobileNumber"
                type="tel"
                style={{
                  marginBottom: "20px"
                }}
                defaultValue={resident.contactMobileNumber}
                onChange={(e) => onChange(e.target.id, e.target.value)}
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
                id="emailAddress"
                name="emailAddress"
                type="text"
                style={{
                  marginBottom: "20px"
                }}
                defaultValue={resident.emailAddress}
                onChange={(e) => onChange(e.target.id, e.target.value)}
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
                  id="dobDay"
                  name="dobDay"
                  type="text"
                  pattern="[0-9]*"
                  inputmode="numeric"
                  defaultValue={resident.dobDay}
                  onChange={(e) => onChange(e.target.id, e.target.value)}
                />
              </div>
            </div>
            <div class="govuk-date-input__item">
              <div class="govuk-form-group">
                <label
                  class="govuk-label govuk-date-input__label"
                  for="dobMonth"
                >
                  Month
                </label>
                <input
                  class="govuk-input govuk-date-input__input govuk-input--width-2 "
                  id="dobMonth"
                  name="dobMonth"
                  type="text"
                  pattern="[0-9]*"
                  inputmode="numeric"
                  defaultValue={resident.DobMonth}
                  onChange={(e) => onChange(e.target.id, e.target.value)}
                />
              </div>
            </div>
            <div class="govuk-date-input__item">
              <div class="govuk-form-group">
                <label
                  class="govuk-label govuk-date-input__label"
                  for="dobYear"
                >
                  Year
                </label>
                <input
                  class="govuk-input govuk-date-input__input govuk-input--width-4 "
                  id="dobYear"
                  name="dobYear"
                  type="text"
                  pattern="[0-9]*"
                  inputmode="numeric"
                  defaultValue={resident.dobYear}
                  onChange={(e) => onChange(e.target.id, e.target.value)}
                />
              </div>
            </div>
          </div>
          <br />
        </div>
        </>
    )
}
