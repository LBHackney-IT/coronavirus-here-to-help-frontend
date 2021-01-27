import React from 'react';
import Layout from '../../../components/layout';
import SupportTable from '../../../components/SupportTable/SupportTable';
import KeyInformation from '../../../components/KeyInformation/KeyInformation';
import Link from 'next/link';
import { Button } from '../../../components/Form';
import { useRouter } from 'next/router';
import { ResidentGateway } from '../../../gateways/resident';
import { HelpRequestGateway } from '../../../gateways/help-request';
import { useState, useEffect } from 'react';
export default function HelpcaseProfile({ residentId }) {
    const [resident, setResident] = useState([]);
    const [helpRequests, setHelpRequests] = useState([]);

    const getResidentAndHelpRequests = async () => {
        try {
            const gateway = new ResidentGateway();
            const resident = await gateway.getResident(residentId);
            const hrGateway = new HelpRequestGateway();
            const helpRequests = await hrGateway.getHelpRequests(residentId);
            // const caseNotesGateway = new CaseNotesGateway();
            // const caseNotes = await caseNotesGateway.getCaseNotes(residentId);

            setResident(resident);
            setHelpRequests(helpRequests);
        } catch (err) {
            console.log(`Error getting resident props with help request ID ${residentId}: ${err}`);
        }
    };
    useEffect(getResidentAndHelpRequests, []);

    return (
        resident && (
            <Layout>
                <div>
                    <a
                        href="/callback-list"
                        className="govuk-back-link"
                        style={{
                            marginTop: '-40px',
                            display: 'block',
                            borderBottom: 'none'
                        }}>
                        Back
                    </a>
                    <div className="govuk-grid-row">
                        <div className="govuk-grid-column-one-quarter-from-desktop sticky-magic">
                            <KeyInformation resident={resident} />
                        </div>

                        <div className="govuk-grid-column-three-quarters-from-desktop">
                            <h1
                                className="govuk-heading-xl"
                                style={{ marginTop: '0px', marginBottom: '40px' }}
                                data-testid="resident-name_header">
                                {resident.firstName} {resident.lastName}
                            </h1>

                        <SupportTable helpRequests={helpRequests} />
                        <Link href="/add-support/[residentId]" as={`/add-support/${residentId}`}>
                            <Button data-cy='add-support-button'text="+ Add new support" />
                        </Link>

                            <hr />

                            <br />
                            {/* <CaseNotes caseNotes={caseNotes} /> */}
                        </div>
                    </div>
                </div>
            </Layout>
        )
    );
}

HelpcaseProfile.getInitialProps = async ({ query: { residentId }, req, res }) => {
    return {
        residentId
    };
};
