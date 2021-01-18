import React from "react";
import Layout from "../components/layout";
import SupportTable from "../components/SupportTable/SupportTable";
import KeyInformation from "../components/KeyInformation/KeyInformation";
import CaseNotes from "../components/CaseNotes/CaseNotes";

export default function HelpcaseProfile() {
	return (
		<Layout>
			<div>
            <a href="#" class="govuk-back-link" style={{marginTop: '-40px', display: 'block', borderBottom: 'none'}}>Back</a>
            <div class="govuk-grid-row">
    <div class="govuk-grid-column-one-quarter-from-desktop sticky-magic">
        <KeyInformation />
    </div>

    <div class="govuk-grid-column-three-quarters-from-desktop">

        <h1 class="govuk-heading-xl" style={{marginTop: '0px', marginBottom: '40px'}}>Name Surname</h1>

        <SupportTable />

        <br />

        <hr />

        <br />
        <CaseNotes />

    </div>
        </div>            
            </div>
		</Layout>
	);
}
