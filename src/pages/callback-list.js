import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import Layout from "../components/layout";
import CallbacksList from "../components/CallbacksList/CallbacksList";
import { Dropdown } from "../components/Form";
import axios from "axios";
import { objectToQuery } from "./api/utilityFuncs";

export default function CallbacksListPage() {
  const callTypes = ["All", "Help Request", "CEV", "Welfare", "Shielding"];

  const getCallBacks = async (queryParams = {}) => {
    const host = "http://localhost:3001"; //hardcode for now
    const url = `${host}/callback_list${objectToQuery(queryParams)}`;

    axios
      .get(url, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setCallbacks(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [callbacks, setCallbacks] = useState([]); //dummyCallbackResp);
  // const supportType = [{hr:"Help Request", cev:"CEV", welfare:"Welfare", shield:"Shielding", ct:"Contact tracing"}];
  useEffect(getCallBacks, []);

  return (
    <Layout>
      <div>
        <Link href="/">
          <a href="#" class="govuk-back-link">
            Back
          </a>
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
