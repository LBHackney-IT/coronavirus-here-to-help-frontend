import React from 'react';
import Layout from '../components/layout';
import Link from 'next/link';
import GovLinkBox from '../components/GovLinkBox/GovLinkBox';

export default function AssignCallsPage() {
    return (
        <Layout>
            <div>
                <Link href="/dashboard">
                    <a
                        className="govuk-back-link  lbh-back-link"
                        data-testid="admin-back_button">
                        Back
                    </a>
                </Link>

                <h1 className="govuk-heading-xl" style={{ marginBottom: '20px' }}>
                    Manager view
                </h1>

                <div className="govuk-grid-row" id="btn-bottom-panel">
                    <GovLinkBox
                        link="/assign-calls"
                        text="Assign calls"
                        name="assign-calls_button"
                    />
                    <GovLinkBox
                        link="/send-bulk-message"
                        text="Send group text or email"
                        name="send-bulk-message_button"
                    />
                </div>
                <div className="govuk-grid-row govuk-!-margin-top-3" id="btn-bottom-panel">
                    <GovLinkBox
                        link="/manage-callhandlers"
                        text="Manage call handlers"
                        name="manage-callhandlers_button"
                    />
                </div>
            </div>
        </Layout>
    );
}

export async function getServerSideProps() {
    return {
      props: {},
    }
}
