import React from "react";
import Layout from "../components/layout";
import Link from "next/link";
import { useState } from 'react';
import { Button, Checkbox, Dropdown } from "../components/Form";

const callTypes = ["All", "Help Request", "CEV", "Welfare Call", "Shielding"];
const callHandlers = ["Annalyvia", "Ryan", "Ben", "Liudvikas", "Kat", "Marten", "John"]

export default function AssignCallsPage() {
    const [dropdownItems, setDropdownItems] = useState(callTypes);

  return (
    <Layout>
      <div>
        <Link href="/">
            <a href="#" className="govuk-back-link  lbh-back-link">Back</a>
        </Link>

        <h1 className="govuk-heading-xl" style={{marginBottom: "20px"}}>Assign calls</h1>

        <form action="/callback-list" method="post">
          <div className="govuk-!-margin-bottom-5">
            <div className="govuk-grid-row">
              <div className="govuk-grid-column-one-half">
                <label className="govuk-label">Call types</label>
                    <Dropdown dropdownItems={dropdownItems}/>
                <div className="govuk-hint">Select call help type</div>
              </div>
              <br />
              <br />
              <br />
              <br />
              <h3 className="govuk-heading-m" style={{marginRight: '1em', marginLeft: '.2em', marginTop: '2em'}}>Select who is able to make calls today</h3>

              <div className="govuk-checkboxes  lbh-checkboxes">
              
              {callHandlers.map((callHandler) => {
                    return (
                        <Checkbox key={callHandler} label={callHandler} />
                );
              })}
               
                </div>
                </div>
          </div>

          <div className="govuk-grid-row" id="btn-bottom-panel">
            <div className="govuk-grid-column-one-half">
            <Button
                text="Assign"
                addClass="govuk-!-margin-right-1"
                type="submit"
                onClick={() => alert("Calls assigned")}
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
