import React from 'react';
import { splitName } from '../../helpers/formatter';

export default function CallHandlerForm({ callHandler, onChange, validation, onInvalidField }) {
    const { firstName, lastName } = splitName(callHandler.name);

    return (
        <>
            {callHandler.id && (
                <div>
                    <h2 className="govuk-heading-l">Edit details</h2>
                    <h2 className="govuk-heading-m">Callhandlers detail</h2>
                </div>
            )}
            {!callHandler.id && (
                <div>
                    <h2 className="govuk-heading-l">Add a new callhandler</h2>
                    <h2 className="govuk-heading-m">New callhandlers detail</h2>
                </div>
            )}

            <div className="govuk-grid-row">
                <div className="govuk-grid-column-one-half">
                    <div
                        className={`govuk-form-group lbh-form-group ${
                            validation.firstName ? 'govuk-form-group--error' : ''
                        }`}>
                        <label className="govuk-label" for="firstName">
                            First name
                        </label>
                        <span id="first-name-error" className="govuk-error-message">
                            <span
                                hidden={validation.firstName ? false : true}
                                data-testid="first-name-error">
                                Error: Enter the first name
                            </span>
                        </span>
                        <input
                            className="govuk-input  lbh-input"
                            id="firstName"
                            name="firstName"
                            type="text"
                            style={{
                                marginBottom: '20px'
                            }}
                            defaultValue={firstName}
                            onChange={(e) => onChange(e.target.id, e.target.value)}
                            onSubmit={(e) => onChange(e.target.id, e.target.value)}
                            data-testid="callhandler-first-name-input"
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
                            validation.lastName ? 'govuk-form-group--error' : ''
                        }`}>
                        <label class="govuk-label" for="lastName">
                            Last name
                        </label>
                        <span id="last-name-error" className="govuk-error-message">
                            <span
                                hidden={validation.lastName ? false : true}
                                data-testid="last-name-error">
                                Error: Enter the last name
                            </span>
                        </span>
                        <input
                            className="govuk-input  lbh-input"
                            id="lastName"
                            name="lastName"
                            type="text"
                            style={{
                                marginBottom: '20px'
                            }}
                            defaultValue={lastName}
                            onChange={(e) => onChange(e.target.id, e.target.value)}
                            onSubmit={(e) => onChange(e.target.id, e.target.value)}
                            data-testid="callhandler-last-name-input"
                            required
                            onInvalid={(e) => onInvalidField(e.target.id)}
                        />
                    </div>
                </div>
            </div>
            <div className="govuk-grid-row">
                <div className="govuk-grid-column-one-half">
                    <div className="govuk-form-group lbh-form-group">
                        <label class="govuk-label" for="lastName">
                            Email address
                        </label>

                        <input
                            className="govuk-input  lbh-input"
                            id="emailAddress"
                            name="emailAddress"
                            type="text"
                            style={{
                                marginBottom: '20px'
                            }}
                            defaultValue={callHandler.emailAddress}
                            onChange={(e) => onChange(e.target.id, e.target.value)}
                            data-testid="callhandler-email-input"
                        />
                    </div>
                </div>
                <div className="govuk-grid-column-one-half"></div>
            </div>
        </>
    );
}
