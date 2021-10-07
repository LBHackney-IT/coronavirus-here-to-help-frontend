import React from 'react';
import Link from 'next/link';
import { Button } from '../components/Form';
import Layout from '../components/layout';
import ResidentList from '../components/ResidentsList/ResidentList';
import { ResidentGateway } from '../gateways/resident';
import { useEffect, useState } from 'react';

export default function ResidentsList({ firstName, lastName, postcode }) {
    const [residents, setResidents] = useState([]);

    const loadResidents = async () => {
        const gateway = new ResidentGateway();
        const residents = await gateway.getResidentsBySearchParams(
            postcode.replace(/ /g, ''),
            firstName,
            lastName
        );
        setResidents(residents);
    };

    useEffect(() => {
        loadResidents();
    }, []);

    return (
        <Layout>
            <div>
                <Link href="/resident-search">
                    <a href="#" className="govuk-back-link">
                        Back
                    </a>
                </Link>
                <br />
                <h1 className="govuk-heading-xl" style={{ marginBottom: '0.4em' }}>
                    Search results
                </h1>
                <p className="govuk-body" data-testid="resident-search-result-count">
                    Displaying {residents.length} record(s)
                </p>
                <div className="govuk-grid-row">
                    <div className="govuk-grid-column-one-half">
                        <Link href="/resident-search">
                            <Button text="New search" addClass="govuk-button--secondary" />
                        </Link>
                    </div>
                    <div className="govuk-grid-column-one-quarter">
                        <Link href="/create-resident">
                            <Button
                                text="Add new resident"
                                addClass="govuk-button"
                                data-testid="add-new-resident-button"
                            />
                        </Link>
                    </div>
                    <div className="govuk-grid-column-one-half text-align-right"></div>
                    <ResidentList residents={residents} />
                </div>
            </div>
        </Layout>
    );
}

export const getServerSideProps = async ({ query }) => {
    return {
        props: {
            firstName: query.firstName || '',
            lastName: query.lastName || '',
            postcode: query.postcode || ''
        }
    };
};
