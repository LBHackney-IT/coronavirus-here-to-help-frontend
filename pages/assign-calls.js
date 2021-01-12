import React from "react";
import Layout from "../components/layout";
import { useRouter } from "next/router";

export default function residents() {
  const router = useRouter();
  return (
    <Layout>
      <div>
        <a href="#" onClick={() => router.back()}>
          Back
        </a>

        <h1 class="lbh-heading-h1">Assign calls</h1>

        <form action="/assign" method="post">
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
              <h3>Select call help type</h3>
            </div>
            <div class="govuk-grid-column-one-third">
              <label class="govuk-label">Call handlers</label>
              <select class="govuk-select">
                <option value="">Select</option>
                <option value="bd">Ben Dalton</option>
                <option value="lt">Liudvikas T</option>
                <option value="mw">Marten Wetterberg</option>
              </select>
              <h3>Select who is able to make calls today</h3>
            </div>
          </div>

          <div class="govuk-grid-row" id="btn-bottom-panel">
            <div class="govuk-grid-column-one-half">
              <a
                href="/"
                class="govuk-button lbh-button govuk-button--secondary lbh-button--secondary"
              >
                Cancel
              </a>

              <button
                class="govuk-button lbh-button js-cta-btn"
                data-module="govuk-button"
              >
                Assign
              </button>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
}
