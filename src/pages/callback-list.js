import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import Layout from "../components/layout";
import CallbacksList from "../components/CallbacksList/CallbacksList";
import { Dropdown } from "../components/Form";
import axios from "axios";
import { objectToQuery } from "./api/utilityFuncs";

export default function CallbacksListPage() {
  const callTypes = [
    "All",
    "Help Request",
    "CEV",
    "Welfare",
    "Contact Tracing",
  ];

  const [callbacks, setCallbacks] = useState([]);
  const [callHandlers, setCallHandlers] = useState([]);
  const [dropdowns, setDropdowns] = useState({
    call_type: "All",
    assigned_to: "Assigned to",
  });

  const host = "http://localhost:3001"; //hardcode for now

  const getCallBacks = async () => {
    const queryParams = { ...dropdowns };
    if (queryParams.call_type === "All") delete queryParams["call_type"];
    if (queryParams.assigned_to === "Assigned to")
      delete queryParams["assigned_to"];

    const url = `${host}/callback_list${objectToQuery(queryParams)}`;
    const res = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    setCallbacks(res.data);
  };

  const handleCallHandlerChange = (event) => {
    setDropdowns({ ...dropdowns, assigned_to: event });
  };

  const handleCallTypeChange = (event) => {
    setDropdowns({ ...dropdowns, call_type: event });
  };

  const getCallHandlers = async () => {
    const url = `${host}/call_handlers`;
    axios
      .get(url, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        const callHandlers = res.data;
        callHandlers.unshift("Assigned to");
        setCallHandlers(callHandlers);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(getCallBacks, [dropdowns]);

  useEffect(getCallHandlers, []);

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
              <Dropdown
                dropdownItems={callTypes}
                onChange={handleCallTypeChange}
                data-cy="help-type-dropdown"
              />
            </div>
            <div class="govuk-grid-column-one-third">
              <Dropdown
                dropdownItems={callHandlers}
                onChange={handleCallHandlerChange}
              />
            </div>
          </div>
        </div>

        <CallbacksList callbacks={callbacks} />
      </div>
    </Layout>
  );
}
