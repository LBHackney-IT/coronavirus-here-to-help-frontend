import React from 'react';

export default function CallHandlerForm({ callHandler }) {
    return (
        <>
            {callHandler.firstName && callHandler.lastName && (
                <div>
                    <h2 className="govuk-heading-l">Edit details</h2>
                    <h2 className="govuk-heading-m">Callhandlers detail</h2>
                </div>
            )}
            {!callHandler.firstName && !callHandler.lastName && (
                <div>
                    <h2 className="govuk-heading-l">Add a new callhandler</h2>
                    <h2 className="govuk-heading-m">New callhandlers detail</h2>
                </div>
            )}

            <div className="govuk-grid-row">
                <div className="govuk-grid-column-one-half">
                    <h3 className="lbh-heading-h3">First name</h3>
                    <br />
                    <div className="govuk-form-group lbh-form-group">
                        <input
                            className="govuk-input  lbh-input"
                            id="firstName"
                            name="firstName"
                            type="text"
                            style={{
                                marginBottom: '20px'
                            }}
                            defaultValue={callHandler.firstName}
                            // onChange={(e) => onChange(e.target.id, e.target.value)}
                        />
                    </div>
                </div>
            </div>
            <div className="govuk-grid-row">
                <div className="govuk-grid-column-one-half">
                    <h3 className="lbh-heading-h3">Last name</h3>
                    <br />
                    <div className="govuk-form-group lbh-form-group">
                        <input
                            className="govuk-input  lbh-input"
                            id="lastName"
                            name="lastName"
                            type="text"
                            style={{
                                marginBottom: '20px'
                            }}
                            defaultValue={callHandler.lastName}
                            // onChange={(e) => onChange(e.target.id, e.target.value)}
                        />
                    </div>
                </div>
            </div>
            <div className="govuk-grid-row">
                <div className="govuk-grid-column-one-half">
                    <h3 className="lbh-heading-h3">Email address</h3>
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
                            defaultValue={callHandler.emailAddress}
                            // onChange={(e) => onChange(e.target.id, e.target.value)}
                        />
                    </div>
                </div>
                <div className="govuk-grid-column-one-half"></div>
            </div>
        </>
    );
}
