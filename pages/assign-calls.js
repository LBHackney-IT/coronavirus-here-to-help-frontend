import React from "react";
import Layout from "../components/layout";
import { useRouter } from "next/router";
import { useState } from 'react';

export default function residents() {
    const router = useRouter();
    const callHandlers = ["Annalyvia", "Ryan", "Ben", "Liudvikas", "Kat", "Marten"]
    const CEV = [];
    const Shielding = [];
    const Welfare = [];
    const HelpRequest = [];

    // const [assignee, setAssignee] = useState([]);

    // // const handleChange = (event) => ({
        
    // // });
    console.log();




  return (
    <Layout>
      <div>
        <a href="#" onClick={() => router.back()} class="govuk-back-link">
          Back
        </a>

        <h1 class="govuk-heading-xl">Assign calls</h1>

        <form action="/assign" method="post">
          <div class="govuk-!-margin-bottom-5">
            <div class="govuk-grid-row">
              <div class="govuk-grid-column-one-half">
                <label class="govuk-label">Call types</label>
                <select class="govuk-select">
                  <option value="all">All</option>
                  <option value="help-request">Help Request</option>
                  <option value="cev">CEV</option>
                  <option value="welfare">Welfare</option>
                  <option value="shielding">Shielding</option>
                </select>
                <div class="govuk-hint">Select call help type</div>
              </div>
              <br />
              <br />
              <br />
              <br />
              <h3 class="govuk-heading-m" style={{marginRight: '1em', marginLeft: '.2em', marginTop: '3em'}}>Select who is able to make calls today</h3>

              <div class="govuk-checkboxes  lbh-checkboxes">
              {callHandlers.map((callHandler) => {
                  const { value, label } = 
                    typeof callHandler == "string" ? { value: callHandler, label: callHandler } : callHandler;
                    return (
                        <div class="govuk-checkboxes__item">
                        <input class="govuk-checkboxes__input" id="initial-bd" name="initial-bd" type="checkbox" value="bd" aria-describedby="CallOutcome-hint" value={value} />
                                <label class="govuk-label govuk-checkboxes__label" for="initial-bd">
                                    {label}                      
                                </label>
                        </div>
                );
              })}
               
                </div>
                </div>
          </div>

          <div class="govuk-grid-row" id="btn-bottom-panel">
            <div class="govuk-grid-column-one-half">
              <button
                class="govuk-button govuk-!-margin-right-1 js-cta-btn"
                data-module="govuk-button"
              >
                Assign
              </button>

              <a href="/" class="govuk-button govuk-button--secondary">
                Cancel
              </a>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
}
