import React from 'react';
import { Button, Dropdown } from '../components/Form';
import Layout from '../components/layout';
import Link from 'next/link';

const callHandlers = ["Annalyvia", "Ryan", "Ben", "Liudvikas", "Kat", "Marten", "John"]

export default function ReassignCalls() {
    return (
        <Layout>
            <div>
            <Link href="/callback-list">
                <a href="#" class="govuk-back-link">Back</a>
            </Link>
            <h1 class="govuk-heading-l">Reassign call to initials</h1>
                <form action="/listcall" method="post">
                    <h3 class="govuk-heading-m">Select a new call handler</h3>
                    <div class="govuk-form-group">
                        <Dropdown dropdownItems={callHandlers} />
                    </div>
                    <div class="govuk-grid-row" id="btn-bottom-panel">
                        <div class="govuk-grid-column-one-half">
                            <Button
                                text="Assign"
                                addClass="govuk-button govuk-!-margin-right-1"
                            />
                            <Button
                                text="Cancel"
                                addClass="govuk-button--secondary"
                            />
                        </div>
                    </div>
                </form>
            </div>
        </Layout>
    )
}
