import React from "react";
import Layout from "../components/layout";
import { useRouter } from "next/router";

export default function residents() {
  const router = useRouter();
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
              <div class="govuk-grid-column-one-third">
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
              <div class="govuk-grid-column-two-thirds">
                <label class="govuk-label">Call handlers</label>
                <select class="govuk-select">
                  <option value="">Select</option>
                  <option value="bd">Ben Dalton</option>
                  <option value="lt">Liudvikas T</option>
                  <option value="mw">Marten Wetterberg</option>
                </select>
                <div class="govuk-hint">
                  Select who is able to make calls today
                </div>
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
