import Link from "next/link";
import React, { useEffect, useState } from "react";
import Layout from "../components/layout";
import CallbacksList from "../components/CallbacksList/CallbacksList";
import { Dropdown } from "../components/Form";
import { CallbackGateway } from "../gateways/callback";
import { CallHandlerGateway } from "../gateways/call-handler";
import { CallTypesGateway } from "../gateways/call-types";

function CallbacksListPage({ callTypes }) {
  const [callbacks, setCallbacks] = useState([]);
  const [callHandlers, setCallHandlers] = useState([]);
  const [dropdowns, setDropdowns] = useState({
    call_type: "All",
    assigned_to: "Assigned to",
  });

  const getCallBacks = async () => {
    const queryParams = { ...dropdowns };
    if (queryParams.call_type === "All") delete queryParams["call_type"];
    if (queryParams.assigned_to === "Assigned to")
      delete queryParams["assigned_to"];

    const gateway = new CallbackGateway();
    const callback_list = await gateway.getCallback(queryParams);

    setCallbacks(callback_list);
  };

  const handleCallHandlerChange = (event) => {
    setDropdowns({ ...dropdowns, assigned_to: event });
  };

  const handleCallTypeChange = (event) => {
    setDropdowns({ ...dropdowns, call_type: event });
  };

  const getCallHandlers = async () => {
    const gateway = new CallHandlerGateway();
    const callhandler_list = await gateway.getCallHandler();

    callhandler_list.unshift("Assigned to");

    setCallHandlers(callhandler_list);
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
                data-cy="call-handlers-dropdown"
              />
            </div>
          </div>
        </div>

        <CallbacksList callbacks={callbacks} />
      </div>
    </Layout>
  );
}

CallbacksListPage.getInitialProps = async (ctx) => {
  const gateway = new CallTypesGateway();
  const res = await gateway.getCallTypes();
  return { callTypes: res };
};

export default CallbacksListPage