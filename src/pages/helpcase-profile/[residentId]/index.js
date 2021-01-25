import React from 'react';
import Layout from '../../../components/layout';
import SupportTable from '../../../components/SupportTable/SupportTable';
import KeyInformation from '../../../components/KeyInformation/KeyInformation';
import CaseNotes from '../../../components/CaseNotes/CaseNotes';
import Link from 'next/link';
import { Button } from '../../../components/Form';
import { useRouter } from 'next/router';
import { ResidentGateway } from '../../../gateways/resident';
import { HelpRequestGateway } from '../../../gateways/help-request';
import { CaseNotesGateway } from '../../../gateways/case-notes';


export default function HelpcaseProfile({ resident_id, resident, helpRequests, caseNotes }) {
    const router = useRouter();

    return (
        <Layout>
            <div>
                <a
                    href="#"
                    className="govuk-back-link"
                    style={{
                        marginTop: '-40px',
                        display: 'block',
                        borderBottom: 'none'
                    }}>
                    Back {resident_id}
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
                        <Link href="/add-support/[resident_id]" as={`/add-support/${resident_id}`}>
                            <Button text="+ Add new support" />
                        </Link>

                        <hr />

                        <br />
                        <CaseNotes caseNotes={caseNotes} />
                    </div>
                </div>
            </div>
        </Layout>
    );
}

HelpcaseProfile.getInitialProps = async ({ query: { residentId }, req, res }) => {
    try {
        const gateway = new ResidentGateway();
        const resident = await gateway.getResident(residentId);
        const hrGateway = new HelpRequestGateway();
        const helpRequests = await hrGateway.getHelpRequests(residentId);
        const caseNotesGateway = new CaseNotesGateway();
        const caseNotes = await caseNotesGateway.getCaseNotes(residentId);

        return {
            residentId,
            resident,
            helpRequests,
            caseNotes
        };
    } catch (err) {
        console.log(`Error getting resident props with help request ID ${residentId}: ${err}`);
    }
};
