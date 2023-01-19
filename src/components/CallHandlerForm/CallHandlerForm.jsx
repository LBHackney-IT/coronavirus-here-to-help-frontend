import React from 'react';

export default function CallHandlerForm({ callHandler, onChange, validation, onInvalidField }) {
    return (
        <>
            {callHandler.id && (
                <div data-testid="addedit-header-container">
                    <h2 className="govuk-heading-l">Edit details</h2>
                    <h2 className="govuk-heading-m">Call handler detail</h2>
                </div>
            )}
            {!callHandler.id && (
                <div data-testid="addedit-header-container">
                    <h2 className="govuk-heading-l">Add a new call handler</h2>
                    <h2 className="govuk-heading-m">New call handler detail</h2>
                </div>
            )}

            <div className="govuk-grid-row">
                <div className="govuk-grid-column-one-half">
                    <div
                        className={`govuk-form-group lbh-form-group ${
                            validation.name ? 'govuk-form-group--error' : ''
                        }`}>
                        <label className="govuk-label" htmlFor="name">
                            Name
                        </label>
                        <span id="first-name-error" className="govuk-error-message">
                            { validation.name &&
                                <span
                                    data-testid="name-error">
                                    Error: Enter the name
                                </span>
                            }
                        </span>

                        <input
                            className="govuk-input  lbh-input"
                            id="name"
                            name="name"
                            type="text"
                            style={{
                                marginBottom: '20px'
                            }}
                            defaultValue={callHandler.name}
                            onChange={(e) => onChange(e.target.id, e.target.value)}
                            onSubmit={(e) => onChange(e.target.id, e.target.value)}
                            data-testid="callhandler-name-input"
                            required
                            onInvalid={(e) => onInvalidField(e.target.id)}
                        />
                    </div>
                </div>
            </div>
            <div className="govuk-grid-row">
                <div className="govuk-grid-column-one-half">
                    <div className="govuk-form-group lbh-form-group">
                        <label className="govuk-label" htmlFor="email">
                            Email address
                        </label>

                        <input
                            className="govuk-input  lbh-input"
                            id="email"
                            name="email"
                            type="text"
                            style={{
                                marginBottom: '20px'
                            }}
                            defaultValue={callHandler.email}
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
