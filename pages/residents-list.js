import React from 'react';
import { useRouter } from "next/router";
import { Button } from '../components/Form/Button/Button';
import Layout from '../components/layout';
import { useState } from 'react';
import ResidentList from '../components/ResidentsList/ResidentList';

export default function ResidentsList({ searchPostcode }) {
    const router = useRouter();

    const dummyResidentsList = [
        {
          first_name: "Bob",
          last_name: "Hoskins",
          address_first_line: "Flat 20 Caliban House",
          address_second_line: "Frankfurt Street",
          postcode: "N4 5JQ",
          date_of_birth: '01/10/84',
        },
        {
          first_name: "Mary",
          last_name: "Johnson",
          address_first_line: "Markmanor Ave 15",
          address_second_line: "Url Street",
          postcode: "E4 7NK",
          date_of_birth: '09/03/54',
        },
      ];
    
    const [residents, setResidents] = useState(dummyResidentsList);

    return (
        <Layout>
        <div>
            <a href="#" onClick={() => router.back()} class="govuk-back-link  lbh-back-link">Back</a>
            <br />
            <h1 class="govuk-heading-xl" style={{marginBottom: '0.4em'}}>Search results</h1>
            <h2 class="govuk-heading-m">Help requests matching postcode: </h2>
            <p class="govuk-body">Displaying {residents.length} record(s)</p>
            <div class="govuk-grid-row">
                <div class="govuk-grid-column-one-half">
                    <a href="/searchresident" role="button" draggable="false" class="govuk-button  govuk-button--secondary" data-module="govuk-button">
                        New search
                    </a>
                </div>
                <div class="govuk-grid-column-one-half text-align-right">
                    <a href="/editresident" role="button" draggable="false" class="govuk-button" data-module="govuk-button">
                        Add new resident
                    </a>
                </div>
            </div>
            <ResidentList residents={residents} />
        </div>
    </Layout>
    )
}
