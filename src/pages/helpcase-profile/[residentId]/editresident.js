import React from 'react';
import Layout from '../../../components/layout';
import KeyInformation from '../../../components/KeyInformation/KeyInformation';
import { ResidentGateway } from '../../../gateways/resident';
import { useState, useEffect } from 'react';
import { Button, Address } from '../../../components/Form';
import EditResidentBioForm from '../../../components/EditResidentBioForm/EditResidentBioForm';
import Banner from '../../../components/Banner';
import Link from 'next/link';
import Router from 'next/router';

export default function EditResident({ residentId }) {
    const [resident, setResident] = useState([]);
    const [updatedResident, setUpdatedResident] = useState({});
    const [errorsExist, setErrorsExist] = useState(false);

    const handleEditResident = async (id, value) => {
        setUpdatedResident({ ...updatedResident, [id]: value });
    };

    const handleEditAddress = async (object) => {
        setUpdatedResident({ ...updatedResident, ...object });
    };

    const saveResident = () => {
        if (
            Object.keys(updatedResident).some(
                (k) =>
                    (updatedResident[k] == '')
            )
        ) {
            setErrorsExist(true);
            
            return;
        }
        else{
            const residentGateway = new ResidentGateway();
            residentGateway.setResident(residentId, updatedResident);
            Router.back()
        }
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
                                <a href="#">Some required fields are empty</a>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
            <div className="govuk-grid-column-one-quarter-from-desktop">
                <KeyInformation resident={resident} />
            </div>
            <div className="govuk-grid-column-three-quarters-from-desktop">
                {residentId && (
                    <EditResidentBioForm resident={resident} onChange={handleEditResident} />
                )}

                <hr className="govuk-section-break govuk-section-break--m govuk-section-break--visible" />
                <Address initialResident={resident} onChange={handleEditAddress} />
                <hr className="govuk-section-break govuk-section-break--m govuk-section-break--visible" />
                <Button
                    text="Update"
                    addClass="govuk-!-margin-right-1"
                    onClick={() => saveResident()}
                    data-testid="edit-resident-form-update-button"
                />
                <Link href="/helpcase-profile/[residentId]" as={`/helpcase-profile/${residentId}`}>
                    <Button text="Cancel" addClass="govuk-button--secondary" />
                </Link>
            </div>
        </Layout>
    );
}

EditResident.getInitialProps = async ({ query: { residentId } }) => {
    return { residentId };
};
