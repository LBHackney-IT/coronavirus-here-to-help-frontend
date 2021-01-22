import React from 'react';
import Layout from '../../../components/layout';
import SupportTable from '../../../components/SupportTable/SupportTable';
import KeyInformation from '../../../components/KeyInformation/KeyInformation';
import CaseNotes from '../../../components/CaseNotes/CaseNotes';
import Link from 'next/link';
import { Button } from '../../../components/Form';
import { useRouter } from 'next/router';
import { ResidentGateway } from '../../../gateways/resident';

export default function HelpcaseProfile({ resident_id, resident }) {
    const router = useRouter();

    return (
        <Layout>
            <div>
                <a
                    href="#"
                    class="govuk-back-link"
                    style={{
                        marginTop: '-40px',
                        display: 'block',
                        borderBottom: 'none'
                    }}>
                    Back {resident_id}
                </a>
                <div class="govuk-grid-row">
                    <div class="govuk-grid-column-one-quarter-from-desktop sticky-magic">
                        <KeyInformation resident={resident} />
                    </div>

                    <div class="govuk-grid-column-three-quarters-from-desktop">
                        <h1
                            class="govuk-heading-xl"
                            style={{ marginTop: '0px', marginBottom: '40px' }}
                            data-testid="resident-name_header">
                            {resident.FirstName} {resident.LastName}
                        </h1>

                        <SupportTable />
                        <Link
                            href="/add-support/[resident_id]"
                            as={`/add-support/${resident_id}`}>
                            <Button text="+ Add new support" />
                        </Link>

                        <hr />

                        <br />
                        <CaseNotes />
                    </div>
                </div>
            </div>
        </Layout>
    );
}

HelpcaseProfile.getInitialProps = async ({ query: { resident_id }, req, res }) => {
    try {
        const gateway = new ResidentGateway();
        const resident = await gateway.getResident(resident_id);

        return {
            resident_id,
            resident
        };
    } catch (err) {
        console.log(`Error getting resident props with help request ID ${resident_id}: ${err}`);
    }
};
