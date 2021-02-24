import React from 'react';
import Layout from '../../../components/layout';
import KeyInformation from '../../../components/KeyInformation/KeyInformation';
import { ResidentGateway } from '../../../gateways/resident';
import { useState, useEffect } from 'react';
import { Button, Address } from '../../../components/Form';
import EditResidentBioForm from '../../../components/EditResidentBioForm/EditResidentBioForm';
import Link from 'next/link';
import Router from 'next/router';

export default function EditResident({ residentId }) {
    const [resident, setResident] = useState([]);
    const [updatedResident, setUpdatedResident] = useState({});
    const [errorsExist, setErrorsExist] = useState(false);
    const [validation, setValidation] = useState({});

    const handleEditResident = async (id, value) => {
        if (value==''){
            setValidation({ ...validation, ...{[id]:true} });
          }
          else {
            setValidation({ ...validation, ...{[id]:false} });
          }
        setUpdatedResident({...updatedResident, [id]: value });
    };

    const handleEditAddress = async (object) => {
        setUpdatedResident({ ...updatedResident, ...object });
    };

    const saveResident = () => {
        event.preventDefault()
        const residentGateway = new ResidentGateway();
        residentGateway.setResident(residentId, updatedResident);
        Router.back()
    };

    useEffect(() => {}, [resident]);

    const getResident = async () => {
        try {
            const gateway = new ResidentGateway();
            const resident = await gateway.getResident(residentId);
            // const caseNotesGateway = new CaseNotesGateway();
            // const caseNotes = await caseNotesGateway.getCaseNotes(residentId);

            setResident(resident);
        } catch (err) {
            console.log(`Error getting resident props with help request ID ${residentId}: ${err}`);
        }
    };

    const onInvalidField = (id) => {
        setErrorsExist(true);
        setValidation({ ...validation, ...{[id]:true} });
    }

    useEffect(getResident, []);

    return (
        <Layout>
            { errorsExist && (
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
                            <li>
                                Some required fields are empty
                            </li>
                        </ul>
                    </div>
                </div>
            )}
            <div className="govuk-grid-column-one-quarter-from-desktop">
                <KeyInformation resident={resident} />
            </div>
            <div className="govuk-grid-column-three-quarters-from-desktop">
                <form onSubmit={saveResident}>
                {residentId && (
                    <EditResidentBioForm resident={resident} onChange={handleEditResident} validation={validation} onInvalidField={onInvalidField} />
                )}

                <hr className="govuk-section-break govuk-section-break--m govuk-section-break--visible" />
                <Address initialResident={resident} onChange={handleEditAddress} />
                <hr className="govuk-section-break govuk-section-break--m govuk-section-break--visible" />
                <Button
                    text="Update"
                    addClass="govuk-!-margin-right-1"
                    type="submit"
                    data-testid="edit-resident-form-update-button"
                />
                <Link href="/helpcase-profile/[residentId]" as={`/helpcase-profile/${residentId}`}>
                    <Button text="Cancel" addClass="govuk-button--secondary" />
                </Link>
                </form>
            </div>
        </Layout>
    );
}

EditResident.getInitialProps = async ({ query: { residentId } }) => {
    return { residentId };
};
