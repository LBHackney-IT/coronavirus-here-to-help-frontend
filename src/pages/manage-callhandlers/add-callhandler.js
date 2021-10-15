import React, { useState } from 'react';
import { Button } from '../../components/Form';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../../components/layout';
import CallHandlerForm from '../../components/CallHandlerForm/CallHandlerForm';

export default function addCallHandler() {
    const router = useRouter();
    const [callHandler, setCallHandler] = useState({});

    return (
        <div>
            <Layout>
                {/* {errorsExist && (
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
                )} */}
                <a href="#" onClick={() => router.back()} className="govuk-back-link">
                    Back
                </a>
                <form>
                    {/* <EditResidentBioForm
                        resident={resident}
                        onChange={handleCreateResident}
                        validation={validation}
                        onInvalidField={onInvalidField}
                    /> */}
                    <CallHandlerForm callHandler={callHandler} />

                    <Button
                        text="Save Changes"
                        type="submit"
                        addClass="govuk-!-margin-right-1"
                        data-testid="edit-resident-form-update-button"
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
