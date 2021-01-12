import { useRouter } from "next/router";
import React from "react";
import Layout from "../components/layout";

export default function residents() {
  const router = useRouter();
  // const supportType = [{hr:"Help Request", cev:"CEV", welfare:"Welfare", shield:"Shielding", ct:"Contact tracing"}];

  return (
    <Layout>
      <div>
        <a href="#" onClick={() => router.back()} class="govuk-back-link">
          Back
        </a>
        <h1 class="govuk-heading-xl govuk-!-margin-bottom-2 govuk-!-margin-top-7">
          Callback list
        </h1>
        <br />
        <h3 class="govuk-heading-m">Filter by Help Type:</h3>

        <div class="govuk-!-margin-bottom-5">
          <div class="govuk-grid-row">
            <div class="govuk-grid-column-one-third">
              <select class="govuk-select">
                <option value="all">All</option>
                <option value="help-request">Help Request</option>
                <option value="cev">CEV</option>
                <option value="welfare">Welfare</option>
                <option value="shielding">Shielding</option>
              </select>
            </div>
            <div class="govuk-grid-column-one-third">
              <select class="govuk-select">
                <option value="">Assigned to</option>
                <option value="bd">Ben Dalton</option>
                <option value="lt">Liudvikas T</option>
                <option value="mw">Marten Wetterberg</option>
              </select>
            </div>
          </div>
        </div>

        <p class="govuk-body govuk-!-margin-bottom-1">Displaying 2 record(s)</p>

        <table class="govuk-table">
          <thead class="govuk-table__head">
            <tr class="govuk-table__row">
              <th scope="col" class="govuk-table__header">
                Name
              </th>
              <th scope="col" class="govuk-table__header">
                Address
              </th>
              <th scope="col" class="govuk-table__header">
                Requested Date
              </th>
              <th scope="col" class="govuk-table__header">
                Type
              </th>
              <th scope="col" class="govuk-table__header">
                Unsuccessful call attempts
              </th>
              <th scope="col" class="govuk-table__header">
                Follow-up required
              </th>
              <th scope="col" class="govuk-table__header">
                Assigned to
              </th>
              <th scope="col" class="govuk-table__header">
                Rescheduled at
              </th>
              <th scope="col" class="govuk-table__header"></th>
            </tr>
          </thead>
          <tbody class="govuk-table__body">
            <tr class="govuk-table__row">
              <td class="govuk-table__cell">First name</td>
              <td class="govuk-table__cell">test</td>
              <td class="govuk-table__cell">13 Jan 2021</td>
              <td class="govuk-table__cell">
                <span title="Contact Tracing">ct</span>
              </td>
              <td class="govuk-table__cell ">name</td>
              <td class="govuk-table__cell">name</td>
              <td class="govuk-table__cell">
                <a href="/singleassign" title="John Harries">
                  jh✎
                </a>
              </td>
              <td class="govuk-table__cell">15:34</td>
              <td class="govuk-table__cell">
                <a href="/resident-profile">View</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
