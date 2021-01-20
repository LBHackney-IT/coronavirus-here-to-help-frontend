import React, { useEffect, useState } from "react";
import { Button, Dropdown } from "../../../components/Form";
import Layout from "../../../components/layout";
import Link from "next/link";
import { useRouter } from "next/router";
import { CallHandlerGateway } from "../../../gateways/call-handler";

export default function ReassignCalls() {
  const router = useRouter();
  const { request_id, resident_id } = router.query;

  const getCallHandlers = async () => {
    const gateway = new CallHandlerGateway();
    const callhandler_list = await gateway.getCallHandler();
    setCallHandlers(callhandler_list);
  };

  const [callHandlers, setCallHandlers] = useState([]);
  useEffect(getCallHandlers, []);

  return (
    <Layout>
      <div>
        <Link href="/callback-list">
          <a href="#" class="govuk-back-link">
            Back {request_id}/{resident_id}
          </a>
        </Link>
        <h1 class="govuk-heading-l">Reassign call to initials</h1>
        <form action="/callback-list" method="post">
          <h3 class="govuk-heading-m">Select a new call handler</h3>
          <div class="govuk-form-group">
            <Dropdown dropdownItems={callHandlers} />
          </div>
          <div class="govuk-grid-row" id="btn-bottom-panel">
            <div class="govuk-grid-column-one-half">
              <Button
                text="Assign"
                addClass="govuk-button govuk-!-margin-right-1"
                onClick={() => alert("Call handler reassigned")}
              />
              <Button text="Cancel" addClass="govuk-button--secondary" />
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
}
