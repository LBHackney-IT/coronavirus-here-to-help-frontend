import React from 'react';

const EditResidentBioForm = ({ resident, onChange, validation, onInvalidField }) => {
    return (
        <>
            <h2 className="govuk-heading-l">
                {resident.firstName} {resident.lastName}
            </h2>
            <h2 className="govuk-heading-m">Update resident profile</h2>

            <div className="govuk-grid-row">
                <div className="govuk-grid-column-one-half">
                    <div
                        className={`govuk-form-group lbh-form-group ${
                            validation.firstName ? 'govuk-form-group--error' : ''
                        }`}>
                        <label className="govuk-label" htmlFor="firstName">
                            First name
                        </label>
                        <span id="first-name-error" className="govuk-error-message">
                            {validation.firstName &&
                                <span
                                    data-testid="first-name-error">
                                    Error: Enter the first name
                                </span>
                            }
                        </span>
                        <input
                            className="govuk-input  lbh-input"
                            id="firstName"
                            name="firstName"
                            type="text"
                            style={{
                                marginBottom: '20px'
                            }}
                            defaultValue={resident.firstName}
                            onChange={(e) => onChange(e.target.id, e.target.value)}
                            data-testid="first-name-input"
                            required
                            onInvalid={(e) => {
                                onInvalidField(e.target.id);
                            }}
                        />
                    </div>
                </div>
                <div className="govuk-grid-column-one-half">
                    <div
                        className={`govuk-form-group lbh-form-group ${
                            validation.lastName ? 'govuk-form-group--error' : ''
                        }`}>
                        <label className="govuk-label" htmlFor="lastName">
                            Last name
                        </label>
                        <span id="last-name-error" className="govuk-error-message">
                            {validation.lastName &&
                                <span
                                    data-testid="last-name-error">
                                    Error: Enter the last name
                                </span>
                            }
                        </span>
                        <input
                            className="govuk-input  lbh-input"
                            id="lastName"
                            name="lastName"
                            type="text"
                            style={{
                                marginBottom: '20px'
                            }}
                            defaultValue={resident.lastName}
                            onChange={(e) => onChange(e.target.id, e.target.value)}
                            data-testid="last-name-input"
                            required
                            onInvalid={(e) => onInvalidField(e.target.id)}
                        />
                    </div>
                </div>
            </div>
            <div className="govuk-grid-row">
                <div className="govuk-grid-column-one-half">
                    <div
                        className={`govuk-form-group lbh-form-group ${
                            validation.contactTelephoneNumber ? 'govuk-form-group--error' : ''
                        }`}>
                        <label className="govuk-label" htmlFor="contactTelephoneNumber">
                            Contact telephone
                        </label>
                        <span id="contact-number-error" className="govuk-error-message">
                            {validation.contactTelephoneNumber &&
                                <span
                                    data-testid="contact-number-error">
                                    Error: Enter a valid contact telephone number
                                </span>
                            }
                        </span>
                        <input
                            className="govuk-input  lbh-input"
                            id="contactTelephoneNumber"
                            name="contactTelephoneNumber"
                            type="number"
                            style={{
                                marginBottom: '20px'
                            }}
                            defaultValue={resident.contactTelephoneNumber}
                            onChange={(e) => onChange(e.target.id, e.target.value)}
                            data-testid="contact-telephone-input"
                            required
                            pattern="^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$"
                            onInvalid={(e) => onInvalidField(e.target.id)}
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
                            type="number"
                            style={{
                                marginBottom: '20px'
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
                                marginBottom: '20px'
                            }}
                            defaultValue={resident.emailAddress}
                            onChange={(e) => onChange(e.target.id, e.target.value)}
                        />
                    </div>
                </div>
                <div className="govuk-grid-column-one-half"></div>
            </div>
            <div
                className={`govuk-form-group lbh-form-group ${
                    validation.dobDay || validation.dobMonth || validation.dobYear
                        ? 'govuk-form-group--error'
                        : ''
                }`}>
                <h3 className="lbh-heading-h3">Date of birth</h3>
                <span id="dob-error" className="govuk-error-message">
                    {(validation.dobDay || validation.dobMonth || validation.dobYear) &&
                        <span
                            data-testid="dob-error">
                            Error: Enter a valid date of birth
                        </span>
                    }
                </span>
                <div className="govuk-date-input  lbh-date-input">
                    <div className="govuk-date-input__item">
                        <label className="govuk-label govuk-date-input__label" htmlFor="DobDay">
                            Day
                        </label>
                        <input
                            className="govuk-input govuk-date-input__input govuk-input--width-2 "
                            id="dobDay"
                            name="dobDay"
                            type="text"
                            pattern="\d*"
                            maxLength="2"
                            inputMode="numeric"
                            defaultValue={resident.dobDay}
                            onChange={(e) => onChange(e.target.id, e.target.value)}
                            data-testid="dobDay-input"
                            required
                            onInvalid={(e) => onInvalidField(e.target.id)}
                        />
                    </div>
                    <div className="govuk-date-input__item">
                        <label className="govuk-label govuk-date-input__label" htmlFor="dobMonth">
                            Month
                        </label>
                        <input
                            className="govuk-input govuk-date-input__input govuk-input--width-2 "
                            id="dobMonth"
                            name="dobMonth"
                            type="text"
                            pattern="\d*"
                            maxLength="2"
                            inputMode="numeric"
                            defaultValue={resident.dobMonth}
                            onChange={(e) => onChange(e.target.id, e.target.value)}
                            data-testid="dobMonth-input"
                            required
                            onInvalid={(e) => onInvalidField(e.target.id)}
                        />
                    </div>
                    <div className="govuk-date-input__item">
                        <label className="govuk-label govuk-date-input__label" htmlFor="dobYear">
                            Year
                        </label>
                        <input
                            className="govuk-input govuk-date-input__input govuk-input--width-4 "
                            id="dobYear"
                            name="dobYear"
                            type="text"
                            pattern="\d*"
                            maxLength="4"
                            inputMode="numeric"
                            defaultValue={resident.dobYear}
                            onChange={(e) => onChange(e.target.id, e.target.value)}
                            data-testid="dobYear-input"
                            required
                            onInvalid={(e) => onInvalidField(e.target.id)}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditResidentBioForm;
