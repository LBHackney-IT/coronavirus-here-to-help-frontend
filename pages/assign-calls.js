import React from "react";
import Layout from "../components/layout";
import Link from "next/link";
import { useState } from 'react';
import { Button, Checkbox, Dropdown } from "../components/Form";

const callTypes = ["All", "Help Request", "CEV", "Welfare", "Shielding"];
const callHandlers = ["Annalyvia", "Ryan", "Ben", "Liudvikas", "Kat", "Marten", "John"]

export default function AssignCallsPage() {
    const [dropdownItems, setDropdownItems] = useState(callTypes);

  return (
    <Layout>
      <div>
        <Link href="/">
            <a href="#" class="govuk-back-link  lbh-back-link">Back</a>
        </Link>

        <h1 class="govuk-heading-xl" style={{marginBottom: "20px"}}>Assign calls</h1>

        <form action="/assign" method="post">
          <div class="govuk-!-margin-bottom-5">
            <div class="govuk-grid-row">
              <div class="govuk-grid-column-one-half">
                <label class="govuk-label">Call types</label>
                    <Dropdown dropdownItems={dropdownItems}/>
                <div class="govuk-hint">Select call help type</div>
              </div>
              <br />
              <br />
              <br />
              <br />
              <h3 class="govuk-heading-m" style={{marginRight: '1em', marginLeft: '.2em', marginTop: '2em'}}>Select who is able to make calls today</h3>

              <div class="govuk-checkboxes  lbh-checkboxes">
              
              {callHandlers.map((callHandler) => {
                    return (
                        <Checkbox key={callHandler} label={callHandler} />
                );
              })}
               
                </div>
                </div>
          </div>

          <div class="govuk-grid-row" id="btn-bottom-panel">
            <div class="govuk-grid-column-one-half">
            <Button
                text="Assign"
                addClass="govuk-!-margin-right-1"
                type="submit"
            />
              
              <Link href="/">
                    <Button
                        text="Cancel"
                        addClass="govuk-button--secondary"
                    />
                </Link>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
}
