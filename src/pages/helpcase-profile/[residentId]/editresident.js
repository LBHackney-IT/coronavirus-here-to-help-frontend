import React from 'react';
import Layout from '../../../components/layout';
import KeyInformation from '../../../components/KeyInformation/KeyInformation';
import { ResidentGateway } from '../../../gateways/resident';
import { useState } from 'react';
import { Button, Address, RadioButton } from '../../../components/Form';
import EditResidentBioForm from '../../../components/EditResidentBioForm/EditResidentBioForm';
import CaseNotes from '../../../components/CaseNotes/CaseNotes';

export default function EditResident({ residentId, resident }) {
    const [updatedResident, setUpdatedResident] = useState(resident);

    const handleEditResident = (id, value) => {
        setUpdatedResident({ ...updatedResident, [id]: value });
        console.log(updatedResident, value);
    };

    const logNewResidentDetails = () => {
        console.log(updatedResident);
        const gateway = new ResidentGateway();
        gateway.updateResident(residentId, updatedResident);
    };

    return (
        <Layout>
            <div className="govuk-grid-column-one-quarter-from-desktop">
                <KeyInformation resident={resident} />
            </div>
            <div className="govuk-grid-column-three-quarters-from-desktop">
                <EditResidentBioForm resident={resident} onChange={handleEditResident} />

                <hr className="govuk-section-break govuk-section-break--m govuk-section-break--visible" />
                <Address initialResident={resident} onChange={handleEditResident} />

                <hr className="govuk-section-break govuk-section-break--m govuk-section-break--visible" />
                <fieldset className="govuk-fieldset">
                    <legend className="govuk-fieldset__legend">
                        Can we share the information you’ve provided with voluntary or community
                        organisations?
                    </legend>
                    <RadioButton radioButtonItems={['Yes', 'No']} name="consentToShare" />
                </fieldset>
                <hr className="govuk-section-break govuk-section-break--m govuk-section-break--visible" />

                <Button
                    text="Cancel"
                    addClass="govuk-button--secondary"
                    onClick={() => logNewResidentDetails()}
                />
                <span> </span>

                <Button
                    text="Next"
                    addClass="govuk-!-margin-right-1"
                    onClick={() => logNewResidentDetails()}
                />
            </div>
        </Layout>
    );
}

EditResident.getInitialProps = async ({ query: { residentId }, req, res }) => {
    try {
        const gateway = new ResidentGateway();
        const resident = await gateway.getResident(residentId);

        return {
            residentId,
            resident
        };
    } catch (err) {
        console.log(`Error getting resident props with help request ID ${residentId}: ${err}`);
    }
};
