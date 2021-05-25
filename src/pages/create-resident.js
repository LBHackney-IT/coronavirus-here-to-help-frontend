import React, { useState } from 'react';
import { Button, Address } from '../components/Form';
import Link from 'next/link';
import Layout from '../components/layout';
import EditResidentBioForm from '../components/EditResidentBioForm/EditResidentBioForm';
import { useRouter } from 'next/router';
import { ResidentGateway } from '../gateways/resident';

export default function CreateResident({}) {
    const router = useRouter();
    const [resident, setResident] = useState({});
    const [errorsExist, setErrorsExist] = useState(false);
    const [validation, setValidation] = useState({});

    const handleCreateResident = async (id, value) => {
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
        setResident({ ...resident, [id]: value });
        console.log('resident:', resident);
    };

    const handleCreateAddress = async (object) => {
        setResident({ ...resident, ...object });
    };

    const saveResident = (event) => {
        event.preventDefault();
        const residentGateway = new ResidentGateway();
        residentGateway.postResident(resident).then((newResident) => {
            console.log('resident response', newResident);
            router.push(`/helpcase-profile/${newResident.Id}`);
        }).catch(() => {
            console.log('Resident could not be created!');
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

                <form onSubmit={saveResident}>
                    <EditResidentBioForm
                        resident={resident}
                        onChange={handleCreateResident}
                        validation={validation}
                        onInvalidField={onInvalidField}
                    />
                    <hr className="govuk-section-break govuk-section-break--m govuk-section-break--visible" />
                    <Address initialResident={resident} onChange={handleCreateAddress} />
                    <hr className="govuk-section-break govuk-section-break--m govuk-section-break--visible" />
                    <Button
                        text="Save"
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
