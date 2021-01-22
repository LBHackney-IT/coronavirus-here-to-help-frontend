import React from 'react';
import Layout from '../../../components/layout';
import KeyInformation from '../../../components/KeyInformation/KeyInformation';
import { ResidentGateway } from '../../../gateways/resident';
import { useState } from 'react';
import { Button, Address } from '../../../components/Form';
import EditResidentBioForm from '../../../components/EditResidentBioForm/EditResidentBioForm';
import CaseNotes from '../../../components/CaseNotes/CaseNotes';

export default function EditResident({ resident_id, resident }) {
    const [updatedResident, setUpdatedResident] = useState(resident);

    const handleEditResident = (id, value) => {
        setUpdatedResident({ ...updatedResident, [id]: value });
        console.log(updatedResident, value);
    };

    const logNewResidentDetails = () => {
        console.log(updatedResident);
    };

    return (
        <Layout>
            <div class="govuk-grid-column-one-quarter-from-desktop">
                <KeyInformation resident={resident} />
            </div>
            <div class="govuk-grid-column-three-quarters-from-desktop">
                <EditResidentBioForm resident={resident} onChange={handleEditResident} />

                <hr class="govuk-section-break govuk-section-break--m govuk-section-break--visible" />
                <Address />

                <hr class="govuk-section-break govuk-section-break--m govuk-section-break" />
                <h2 class="govuk-heading-l">Case notes:</h2>
                <h3 class="govuk-heading-m">Add a new case note (optional):</h3>
                <div class="govuk-form-group">
                    <span id="NewCaseNote-hint" class="govuk-hint  lbh-hint"></span>
                    <textarea
                        class="govuk-textarea  lbh-textarea"
                        id="NewCaseNote"
                        name="NewCaseNote"
                        rows="5"
                        aria-describedby="NewCaseNote-hint"></textarea>
                </div>
                <h3 class="govuk-heading-m">Case note history:</h3>
                <input type="hidden" name="CaseNotes" value="" />
                <br />
                <p class="lbh-body-m"></p>
                <h3 class="govuk-heading-m">Call attempts history:</h3>
                <br />
                <hr class="govuk-section-break govuk-section-break--m govuk-section-break--visible" />
                <CaseNotes />
                <hr class="govuk-section-break govuk-section-break--m govuk-section-break" />
                <Button
                    text="Update"
                    addClass="govuk-!-margin-right-1"
                    onClick={() => logNewResidentDetails()}
                />
                <Button
                    text="Cancel"
                    addClass="govuk-button--secondary"
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
