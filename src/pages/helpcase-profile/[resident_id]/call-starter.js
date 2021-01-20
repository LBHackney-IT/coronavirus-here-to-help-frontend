import React from "react";
import Layout from "../../../components/layout";
import KeyInformation from "../../../components/KeyInformation/KeyInformation";
import CaseNotes from "../../../components/CaseNotes/CaseNotes";
import { RadioButton, Button } from "../../../components/Form";
import Link from "next/link";

export default function callStarter() {
    const startConverstationRadioOptions = ["Start conversation", "Reschedule call", "Unwilling to engage"];

	return (
		<Layout>
			<div>
            <Link href="/helpcase-profile/1">
                <a href="#" class="govuk-back-link">Back</a>
            </Link>
                <div class="govuk-grid-column-one-quarter-from-desktop sticky-magic">
                    <KeyInformation />
                </div>

				<h2 class="govuk-heading-l">Start a conversation</h2>

				<fieldset class="govuk-fieldset">
					<legend class="govuk-fieldset__legend">
						What would the resident like to do?
					</legend>
                    <RadioButton radioButtonItems={startConverstationRadioOptions} name="StartConversation" />
					
				</fieldset>
                <Link href="/add-support">
                    <Button
                            text="Continue"
                    />
                </Link>
			</div>
            <CaseNotes />
		</Layout>
	);
}
