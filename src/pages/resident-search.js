import React from 'react';
import Link from 'next/link';
import { Button, Checkbox } from "../components/Form";
import Layout from '../components/layout';

export default function ResidentSearchPage() {

    return (
        <Layout>
        <div>
            <Link href="/">
                <a href="#" class="govuk-back-link  lbh-back-link">Back</a>
            </Link>
            <hr class="govuk-section-break govuk-section-break--s govuk-section-break"></hr>
              <h1 class="govuk-heading-xl" style={{marginBottom: '0.1em'}}>Resident lookup</h1>
              <p class="govuk-body">Search for resident by postcode <strong>or</strong> name to see if weve helped them before.</p>
              <hr class="govuk-section-break govuk-section-break--m govuk-section-break"></hr>
              <form action="/listresident" >
              <div class="govuk-!-margin-bottom-5">
                <div class="govuk-grid-row row-margin-top-m">
                    <div class="govuk-grid-column-one-third">
                    <label class="govuk-label" for="postcode">Postcode</label>
              <div>
              <input class="govuk-input govuk-input--width-10" id="postcode" name="postcode" type="text" />
              </div>
                    </div>
                    <div class="govuk-grid-column-one-third">
                    <label class="govuk-label" for="firstName">First name</label>
              <div class="govuk-form-group">
              <input class="govuk-input govuk-input--width-12" id="firstName" name="firstName" type="text" />
              </div>
                    </div>
                    <div class="govuk-grid-column-one-third">
                    <label class="govuk-label" for="lastName">Last name</label>
              <div class="govuk-form-group">
              <input class="govuk-input govuk-input--width-12" id="lastName" name="lastName" type="text" />
              </div>
                    </div>
                </div>
                </div>
                <Link href="/residents-list">
                    <Button
                        text="Search"
                    />
                </Link>
              </form>
        </div>
        </Layout>
    )
}


