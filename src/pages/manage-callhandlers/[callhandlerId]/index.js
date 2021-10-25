import React, { useState, useEffect } from 'react';
import CallHandlerForm from '../../../components/CallHandlerForm/CallHandlerForm';
import { CallHandlerGateway } from '../../../gateways/call-handler';
import Layout from '../../../components/layout';
import { useRouter } from 'next/router';
import { Button } from '../../../components/Form';
import Link from 'next/link';

export default function callHandlerView({ callhandlerId }) {
    const router = useRouter();
    const [callHandler, setCallHandler] = useState({});
    const [errorsExist, setErrorsExist] = useState(false);
    const [validation, setValidation] = useState({});

    const handleEditCallHandler = async (id, value) => {
        let newValidation;
        if (value == '') {
            newValidation = { ...validation, ...{ [id]: true } };
            setValidation(newValidation);
        } else {
            newValidation = { ...validation, ...{ [id]: false } };
            setValidation(newValidation);
        }
        if (Object.values(newValidation).every((k) => k == false)) {
            setErrorsExist(false);
        }

        setCallHandler({ ...callHandler, [id]: value });
    };

    const deleteCallHandler = async () => {
        const gateway = new CallHandlerGateway();
        await gateway.deleteCallHandler(callHandler.id);
        router.back();
    };

    const saveCallHandler = (event) => {
        console.log('save');
        event.preventDefault();
        const gateway = new CallHandlerGateway();
        gateway
            .updateCallHandler(callHandler)
            .then((newCallHandler) => {
                console.log('callhandler response', newCallHandler);
                router.back();
            })
            .catch((e) => {
                console.log(`Patch failed! ${e}`);
                alert('Callhandler could not be updated.');
            });
    };

    const onInvalidField = (id) => {
        setErrorsExist(true);
        setValidation({ ...validation, ...{ [id]: true } });
    };

    const getCallHandler = async () => {
        try {
            const gateway = new CallHandlerGateway();
            const callHandler = await gateway.getCallHandler(callhandlerId);

            setCallHandler(callHandler);
        } catch (err) {
            console.log(
                `Error getting call handler props with call handler id ${callhandlerId}: ${err}`
            );
        }
    };

    useEffect(getCallHandler, []);

    return (
        <div>
            <Layout>
                {errorsExist && (
                    <div
                        className="govuk-error-summary"
                        aria-labelledby="error-summary-title"
                        role="alert"
                        tabIndex="-1"
                        data-module="govuk-error-summary"
                        data-testid="edit-resident-form-validation-error">
                        <h2 className="govuk-error-summary__title" id="error-summary-title">
                            There is a problem
                        </h2>
                        <div className="govuk-error-summary__body">
                            <ul className="govuk-list govuk-error-summary__list">
                                <li>Some required fields are empty</li>
                            </ul>
                        </div>
                    </div>
                )}
                <a
                    href="#"
                    onClick={() => router.back()}
                    className="govuk-back-link">
                    Back
                </a>
                <form onSubmit={saveCallHandler}>
                    <CallHandlerForm
                        callHandler={callHandler}
                        onChange={handleEditCallHandler}
                        validation={validation}
                        onInvalidField={onInvalidField}
                    />
                    <div>
                        <Button
                            text="Remove this person"
                            type="button"
                            onClick={async () => await deleteCallHandler()}
                            addClass="govuk-secondary lbh-button govuk-button lbh-button--secondary"
                            data-testid="remove-callhandler-button"
                        />
                    </div>
                    <Button
                        text="Save Changes"
                        type="submit"
                        addClass="govuk-!-margin-right-1"
                        data-testid="edit-callhandler-form-update-button"
                    />
                    <Link href="/manage-callhandlers">
                        <Button
                            text="Cancel"
                            addClass="govuk-button--secondary"
                            onClick={() => router.back()}
                        />
                    </Link>
                </form>
            </Layout>
        </div>
    );
}

callHandlerView.getInitialProps = async ({ query: { callhandlerId } }) => {
    return {
        callhandlerId
    };
};
