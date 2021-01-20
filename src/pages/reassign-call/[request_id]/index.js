import React, { useEffect, useState } from "react";
import { Button, Dropdown } from "../../../components/Form";
import Layout from "../../../components/layout";
import Link from "next/link";
import { useRouter } from "next/router";
import { CallHandlerGateway } from "../../../gateways/call-handler";
import { HelpRequestGateway } from "../../../gateways/help-request";

export default function ReassignCalls() {
  const router = useRouter();

  const { request_id, resident_id } = router.query;

  const getCallHandlers = async () => {
    const gateway = new CallHandlerGateway();
    const callhandler_list = await gateway.getCallHandler();
    setCallHandlers(callhandler_list);
  };

  const getHelpRequest = async () => {
    const gateway = new HelpRequestGateway();
    const help_request = await gateway.getHelpRequest(resident_id, request_id);
    setHelpRequest(help_request);
  };

  const [helpRequest, setHelpRequest] = useState({});
  const [callHandlers, setCallHandlers] = useState([]);
  useEffect(getCallHandlers, []);
  useEffect(getHelpRequest, []);

  const handleAssignClick = async () => {
    const gateway = new HelpRequestGateway();
    await gateway.putHelpRequest(resident_id, request_id, helpRequest);
    //alert("Call handler reassigned"); // could probably have a better notification - disabling alert for the sake of cypress
    // magic happens that routes back to callbacks list page automatically
  };

  return (
    <Layout>
      <div>
        <Link href="/callback-list">
          <a href="#" class="govuk-back-link" data-cy="back-button">
            Back
          </a>
        </Link>
        <h1 class="govuk-heading-l">Reassign this call</h1>
        <form action="/callback-list" method="post">
          <h3 class="govuk-heading-m">Select a new call handler</h3>
          <div class="govuk-form-group">
            <Dropdown
              dropdownItems={callHandlers}
              value={helpRequest.assigned_to}
              onChange={(callHandler) => {
                setHelpRequest({ ...helpRequest, assigned_to: callHandler });
              }}
              data-cy="call-handlers-dropdown"
            />
          </div>
          <div class="govuk-grid-row" id="btn-bottom-panel">
            <div class="govuk-grid-column-one-half">
              <Button
                text="Assign"
                addClass="govuk-button govuk-!-margin-right-1"
                onClick={handleAssignClick}
              />
              <Button
                text="Cancel"
                addClass="govuk-button--secondary"
                data-cy="cancel-button"
              />
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
}

export const getServerSideProps = async () => {
  return {
    props: {},
  };
};
