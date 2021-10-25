import React, { useState } from 'react';
import { Button } from '../../components/Form';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../../components/layout';
import CallHandlerForm from '../../components/CallHandlerForm/CallHandlerForm';
import { CallHandlerGateway } from '../../gateways/call-handler';

export default function addCallHandler() {
    const router = useRouter();
    const [callHandler, setCallHandler] = useState({});
    const [errorsExist, setErrorsExist] = useState(false);
    const [validation, setValidation] = useState({});

    const handleCreateCallHandler = async (id, value) => {
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
        console.log('callHandler:', callHandler);
    };

    const saveCallHandler = (event) => {
        event.preventDefault();
        const gateway = new CallHandlerGateway();
        gateway
            .postCallHandler(callHandler)
            .then((newCallHandler) => {
                console.log('callhander response', newCallHandler);
                router.push(`/manage-callhandlers`);
            })
            .catch((e) => {
                console.log(`Post failed! ${e}`);
                alert('Callhandler could not be created.');
            });
    };

    const onInvalidField = (id) => {
        setErrorsExist(true);
        setValidation({ ...validation, ...{ [id]: true } });
    };

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
                        onChange={handleCreateCallHandler}
                        validation={validation}
                        onInvalidField={onInvalidField}
                    />
                    <Button
                        text="Save Changes"
                        type="submit"
                        addClass="govuk-!-margin-right-1"
                        data-testid="add-callhandler-form-update-button"
                    />
                    <Link href="#">
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
