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
    const [showConfirm, setShowConfirm] = useState(false);

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
        await gateway.deleteCallHandler(callHandler.id).then(() => {
            window.location.href = '/manage-callhandlers';
        });
    };

    const saveCallHandler = (event) => {
        console.log('save');
        event.preventDefault();
        const gateway = new CallHandlerGateway();
        gateway
            .updateCallHandler(callHandler)
            .then((newCallHandler) => {
                console.log('callhandler response', newCallHandler);
                window.location.href = '/manage-callhandlers';
            })
            .catch((e) => {
                console.log(`Patch failed! ${e}`);
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
                <a href="#" onClick={() => router.back()} className="govuk-back-link">
                    Back
                </a>
                <form onSubmit={saveCallHandler}>
                    <CallHandlerForm
                        callHandler={callHandler}
                        onChange={handleEditCallHandler}
                        validation={validation}
                        onInvalidField={onInvalidField}
                    />
                    {showConfirm ? (
                        <div className="govuk-grid-row">
                            <div
                                data-testid="delete-confirm-banner"
                                className="govuk-notification-banner govuk-grid-column-one-half"
                                role="region"
                                aria-labelledby="govuk-notification-banner-title"
                                data-module="govuk-notification-banner">
                                <div className="govuk-notification-banner__header">
                                    <h2
                                        className="govuk-notification-banner__title"
                                        id="govuk-notification-banner-title">
                                        Please confirm
                                    </h2>
                                </div>
                                <div className="govuk-notification-banner__content">
                                    <p>
                                        This will remove {callHandler.name} and any calls assigned
                                        to them will be unassigned. Do you wish to continue?
                                    </p>
                                    <div className="govuk-!-margin-top-3">
                                        <Button
                                            text="Yes"
                                            onClick={async () => await deleteCallHandler()}
                                            type="submit"
                                            addClass="govuk-!-margin-right-1"
                                            data-testid="delete-callhandler-confirm-button"
                                        />
                                        <Button
                                            text="No"
                                            data-testid="delete-callhandler-dont-confirm-button"
                                            addClass="govuk-button--secondary"
                                            onClick={() => setShowConfirm(false)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <Button
                                text="Remove this person"
                                type="button"
                                onClick={() => setShowConfirm(true)}
                                addClass="govuk-secondary lbh-button govuk-button lbh-button--secondary"
                                data-testid="remove-callhandler-button"
                            />
                        </div>
                    )}
                    <div className="govuk-grid-row">
                        <div className="govuk-grid-column">
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
                        </div>
                    </div>
                </form>
            </Layout>
        </div>
    );
}

export async function getServerSideProps({ query: { callhandlerId } }) {
    return {
        props: {
            callhandlerId
        }
    };
};
