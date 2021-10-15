import React, { useState, useEffect } from 'react';
import CallHandlerForm from '../../../components/CallHandlerForm/CallHandlerForm';
import { CallHandlerGateway } from '../../../gateways/call-handler';
import Layout from '../../../components/layout';
import { useRouter } from 'next/router';
import { Button } from '../../../components/Form';
import Link from 'next/link';

export default function callHandlerView({ callHandlerId }) {
    const [callHandler, setCallHandler] = useState({});
    const router = useRouter();

    useEffect(async () => {
        const gateway = new CallHandlerGateway();
        try {
            const callHandler = await gateway.getCallHandler(callHandlerId);

            setCallHandler(callHandler);
        } catch (err) {
            console.log(`Error fetching callhandler: ${err}`);
        }
    }, []);

    return (
        <div>
            <Layout>
                <a href="#" onClick={() => router.back()} className="govuk-back-link">
                    Back
                </a>
                <form>
                    <CallHandlerForm callHandler={callHandler} />
                    <Button
                        text="Remove this person"
                        type="remove"
                        addClass="govuk-secondary lbh-button govuk-button lbh-button--secondary"
                        data-testid="remove-callhandler-button"
                    />
                </form>
                <Button
                    text="Save Changes"
                    type="submit"
                    addClass="govuk-!-margin-right-1"
                    data-testid="edit-callhandler-form-update-button"
                />
                <Button
                    text="Cancel"
                    addClass="govuk-button--secondary"
                    onClick={() => router.back()}
                />
            </Layout>
        </div>
    );
}
