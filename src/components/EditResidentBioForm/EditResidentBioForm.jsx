import React from 'react';

export default function EditResidentBioForm({resident, onChange}) {
    return (<>
        <h2 className="govuk-heading-l">
          {resident.firstName} {resident.lastName}
        </h2>
        <h2 className="govuk-heading-m">Update resident profile</h2>

        <div className="govuk-grid-row">
          <div className="govuk-grid-column-one-half">
            <fieldset className="govuk-fieldset lbh-fieldset">
              <legend className="govuk-fieldset__legend">First name</legend>
              <br />
            </fieldset>
            <div className="govuk-form-group lbh-form-group">
              <input
                className="govuk-input  lbh-input"
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
          <div className="govuk-grid-column-one-half">
            <fieldset className="govuk-fieldset lbh-fieldset">
              <legend
                className="govuk-fieldset__legend"
                style={{
                  marginBottom: "30px"
                }}
              >
                Last name
              </legend>
            </fieldset>
            <div className="govuk-form-group lbh-form-group">
              <input
                className="govuk-input  lbh-input"
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
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-one-half">
            <h3 className="lbh-heading-h3">Contact telephone</h3>
            <br />
            <div className="govuk-form-group lbh-form-group">
              <input
                className="govuk-input  lbh-input"
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
          <div className="govuk-grid-column-one-half">
            <h3 className="lbh-heading-h3">Contact mobile (Optional)</h3>
            <br />
            <div className="govuk-form-group lbh-form-group">
              <input
                className="govuk-input  lbh-input"
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
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-one-half">
            <h3 className="lbh-heading-h3">Email address (Optional)</h3>
            <br />
            <div className="govuk-form-group lbh-form-group">
              <input
                className="govuk-input  lbh-input"
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
          <div className="govuk-grid-column-one-half"></div>
        </div>
        <h3 className="lbh-heading-h3">Date of birth</h3>
        <div className="govuk-form-group lbh-form-group">
          <div className="govuk-date-input  lbh-date-input">
            <div className="govuk-date-input__item">
              <div className="govuk-form-group">
                <label className="govuk-label govuk-date-input__label" htmlFor="DobDay">
                  Day
                </label>
                <input
                  className="govuk-input govuk-date-input__input govuk-input--width-2 "
                  id="dobDay"
                  name="dobDay"
                  type="text"
                  pattern="[0-9]*"
                  inputMode="numeric"
                  defaultValue={resident.dobDay}
                  onChange={(e) => onChange(e.target.id, e.target.value)}
                />
              </div>
            </div>
            <div className="govuk-date-input__item">
              <div className="govuk-form-group">
                <label
                  className="govuk-label govuk-date-input__label"
                  htmlFor="dobMonth"
                >
                  Month
                </label>
                <input
                  className="govuk-input govuk-date-input__input govuk-input--width-2 "
                  id="dobMonth"
                  name="dobMonth"
                  type="text"
                  pattern="[0-9]*"
                  inputMode="numeric"
                  defaultValue={resident.DobMonth}
                  onChange={(e) => onChange(e.target.id, e.target.value)}
                />
              </div>
            </div>
            <div className="govuk-date-input__item">
              <div className="govuk-form-group">
                <label
                  className="govuk-label govuk-date-input__label"
                  htmlFor="dobYear"
                >
                  Year
                </label>
                <input
                  className="govuk-input govuk-date-input__input govuk-input--width-4 "
                  id="dobYear"
                  name="dobYear"
                  type="text"
                  pattern="[0-9]*"
                  inputMode="numeric"
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
