import React from 'react';
import Link from "next/link";
import { Button } from '../components/Form';
import Layout from '../components/layout';
import { useState } from 'react';
import ResidentList from '../components/ResidentsList/ResidentList';
import { ResidentGateway } from "../gateways/resident";


export default function ResidentsList({res, postcode}) {

    
    const [residents, setResidents] = useState(res);

    return (
        <Layout>
        <div>
            <Link href="/resident-search">
                <a href="#" class="govuk-back-link">Back</a>
            </Link>
            <br />
            <h1 class="govuk-heading-xl" style={{marginBottom: '0.4em'}}>Search results</h1>
            <h2 class="govuk-heading-m">Help requests matching postcode: {postcode}</h2>
            <p class="govuk-body">Displaying {residents.length} record(s)</p>
            <div class="govuk-grid-row">
                <div class="govuk-grid-column-one-half">
                    <Link href="/resident-search">
                        <Button
                            text="New search"
                            addClass="govuk-button--secondary"
                        />
                    </Link>
                </div>
                <div class="govuk-grid-column-one-half text-align-right">
                    <Button
                            text="Add new resident"
                            style={{marginLeft: '15em'}}
                    />
                </div>
            </div>
            <ResidentList residents={residents} />
        </div>
    </Layout>
    )
}
ResidentsList.getInitialProps = async ({query}) => {
    let postcode = query.postcode.replace(/ /g,'')
    const firstName = query.firstName
    const lastName = query.lastName 
    const gateway = new ResidentGateway();
    const res = await gateway.getResidentsBySearchParams(postcode, firstName, lastName);
    return {res, postcode};
  };