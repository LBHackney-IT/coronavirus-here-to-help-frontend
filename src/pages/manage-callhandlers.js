import React from 'react';
import { useState, useEffect } from 'react';
import Layout from '../components/layout';
import { CallHandlerGateway } from '../gateways/call-handler';

export default function managecallhandlers() {
    const [callHandlers, setCallHandlers] = useState([]);
    const getCallHandlers = async () => {
        const gateway = new CallHandlerGateway();
        const callHandlersList = await gateway.getCallHandler();

        setCallHandlers(callHandlersList.map((c) => c.name));
    };
    useEffect(getCallHandlers, []);

    return (
        <Layout>
            <div>
                <a
                    href="/admin"
                    className="govuk-back-link  lbh-back-link"
                    data-testid="assign-call-back_button">
                    Back
                </a>

                <h1 className="govuk-heading-xl" style={{ marginBottom: '20px' }}>
                    Manage callhandlers(s)
                </h1>

                <h2 className="govuk-heading-l">Add a new callhandler</h2>

                <h2 className="govuk-heading-l">Active callhander(s)</h2>
                <hr className="govuk-section-break govuk-section-break--m govuk-section-break--visible" />

                <div>{callHandlers}</div>
            </div>
        </Layout>
    );
}
