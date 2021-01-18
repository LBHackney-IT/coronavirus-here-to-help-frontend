import Link from "next/link";
import React, { useState } from "react";
import Layout from "../components/layout";
import CallbacksList from "../components/CallbacksList/CallbacksList";
import { Dropdown } from "../components/Form";

export default function CallbacksListPage() {
  const callTypes = ["All", "Help Request", "CEV", "Welfare", "Shielding"];
  const dummyCallbackResp = [
    {
      resident_name: "First name",
      address: "Markmanor Ave 15",
      requested_date: "13 Jan 2021",
      type: "CT",
      unsuccessful_call_attempts: 8,
      follow_up_required: "Yes",
      assigned_to: "John Harries",
      rescheduled_at: "15:34",
    },
    {
      resident_name: "Darth Vader",
      address: "Baker street 1",
      requested_date: "21 Dec 2020",
      type: "HR",
      unsuccessful_call_attempts: 3,
      follow_up_required: "No",
      assigned_to: "Luke Skywalker",
      rescheduled_at: "17:55",
    },
  ];

  const [callbacks, setCallbacks] = useState(dummyCallbackResp);
  // const supportType = [{hr:"Help Request", cev:"CEV", welfare:"Welfare", shield:"Shielding", ct:"Contact tracing"}];

  return (
    <Layout>
      <div>
        <Link href="/">
            <a href="#" class="govuk-back-link">Back</a>
        </Link>
        <h1 class="govuk-heading-xl govuk-!-margin-bottom-2">Callback list</h1>
        <br />
        <h3 class="govuk-heading-m">Filter by Help Type:</h3>

        <div class="govuk-!-margin-bottom-5">
          <div class="govuk-grid-row">
            <div class="govuk-grid-column-one-third">
              <Dropdown dropdownItems={callTypes} />
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

        <CallbacksList callbacks={callbacks} />
      </div>
    </Layout>
  );
}
