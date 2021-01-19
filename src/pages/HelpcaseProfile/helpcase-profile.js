import React from "react";
import Layout from "../../components/layout";
import SupportTable from "../../components/SupportTable/SupportTable";
import KeyInformation from "../../components/KeyInformation/KeyInformation";
import CaseNotes from "../../components/CaseNotes/CaseNotes";
import Link from "next/link";
import { Button } from "../../components/Form";

export default function HelpcaseProfile() {
	return (
		<Layout>
			<div>
			<Link href="/">
                <a href="#" class="govuk-back-link">Back</a>
            </Link>
				<div class="govuk-grid-row">
					<div class="govuk-grid-column-one-quarter-from-desktop sticky-magic">
						<KeyInformation />
					</div>

					<div class="govuk-grid-column-three-quarters-from-desktop">
						<h1
							class="govuk-heading-xl"
							style={{ marginTop: "0px", marginBottom: "40px" }}
						>
							Name Surname
						</h1>

						<SupportTable />

						<Link href="/add-support">
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