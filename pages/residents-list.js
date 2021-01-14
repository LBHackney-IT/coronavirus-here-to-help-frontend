import React from 'react';
import { useRouter } from "next/router";
import { Button } from '../components/Form/Button/Button';
import Layout from '../components/layout';

export default function ResidentsList() {
    const router = useRouter();
    return (
        <Layout>
        <div>
            <a href="#" onClick={() => router.back()} class="govuk-back-link  lbh-back-link">Back</a>
            <br />
            <h1 class="govuk-heading-xl" style={{marginBottom: '0.4em'}}>Search results</h1>
            <h2 class="govuk-heading-m">Help requests matching postcode: </h2>
            <p class="govuk-body">Displaying 2 record(s)</p>
            <div class="govuk-grid-row">
                <div class="govuk-grid-column-one-half">
                    <a href="/searchresident" role="button" draggable="false" class="govuk-button  govuk-button--secondary" data-module="govuk-button">
                        New search
                    </a>
                </div>
                <div class="govuk-grid-column-one-half text-align-right">
                    <a href="/editresident" role="button" draggable="false" class="govuk-button  lbh-button" data-module="govuk-button">
                    Add new resident
                    </a>
                </div>
            </div>
            <table class="govuk-table  lbh-table">
                <thead class="govuk-table__head">
                    <tr class="govuk-table__row">
                    <th scope="col" class="govuk-table__header">Name</th>
                    <th scope="col" class="govuk-table__header">Address</th>
                    <th scope="col" class="govuk-table__header">DOB</th>
                    <th scope="col" class="govuk-table__header"></th>
                    </tr>
                </thead>
                    <tbody class="govuk-table__body">
                            <tr class="govuk-table__row">
                                <td class="govuk-table__cell">
                                    Bob Hoskins
                                </td>
                                <td class="govuk-table__cell">
                                    THE HACKNEY SERVICE CENTRE, 1 HILLMAN STREET, E8 1DY
                                </td>
                                <td class="govuk-table__cell">01/01/1</td>
                                <td class="govuk-table__cell">
                                    <a data-testid="view-button"  href="/oneresident?empty=true" class="js-cta-btn" id="view-resident-3">View</a>
                                </td>
                            </tr>
                            <tr class="govuk-table__row">
                                <td class="govuk-table__cell">
                                    Test Test
                                </td>
                                <td class="govuk-table__cell">
                                    THE HACKNEY SERVICE CENTRE, 1 HILLMAN STREET, E8 1DY
                                </td>
                                <td class="govuk-table__cell">01/01/1</td>
                                <td class="govuk-table__cell">
                                    <a data-testid="view-button"  href="/oneresident?empty=true" class="js-cta-btn" id="view-resident-5">View</a>
                                </td>
                            </tr>
                    </tbody>
            </table>
        </div>
    </Layout>
    )
}
