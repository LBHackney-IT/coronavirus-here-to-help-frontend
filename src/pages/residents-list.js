import React from 'react';
import Link from 'next/link';
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
                <a href="#" className="govuk-back-link">Back</a>
            </Link>
            <br />
            <h1 className="govuk-heading-xl" style={{marginBottom: '0.4em'}}>Search results</h1>
            <h2 className="govuk-heading-m">Help requests matching postcode: {postcode}</h2>
            <p className="govuk-body">Displaying {residents.length} record(s)</p>
            <div className="govuk-grid-row">
                <div className="govuk-grid-column-one-half">
                    <Link href="/resident-search">
                        <Button
                            text="New search"
                            addClass="govuk-button--secondary"
                        />
                    </Link>
                </div>
                <div className="govuk-grid-column-one-half text-align-right">
                    {/* <Button
                            text="Add new resident"
                            style={{marginLeft: '15em'}}
                    /> */}
                </div>
                <ResidentList residents={residents} />
            </div>
            </div>
        </Layout>
    );
}

ResidentsList.getInitialProps = async ({query}) => {
    let postcode = query.postcode.replace(/ /g,'')
    const firstName = query.firstName
    const lastName = query.lastName 
    const gateway = new ResidentGateway();
    const res = await gateway.getResidentsBySearchParams(postcode, firstName, lastName);
    return {res, postcode};
  };