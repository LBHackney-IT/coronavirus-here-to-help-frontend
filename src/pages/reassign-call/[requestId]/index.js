import React, { useEffect, useState } from 'react';
import { Button, Dropdown } from '../../../components/Form';
import Layout from '../../../components/layout';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { CallHandlerGateway } from '../../../gateways/call-handler';
import { HelpRequestGateway } from '../../../gateways/help-request';

export default function ReassignCalls() {
    const router = useRouter();
    const { requestId, residentId } = router.query;

    const [assignee, setAssignee] = useState({});
    const [callHandlers, setCallHandlers] = useState([]);

    const getCallHandlers = async () => {
        const gateway = new CallHandlerGateway();
        const callhandlerList = await gateway.getCallHandler();
        setCallHandlers(callhandlerList);
    };

    const getHelpRequest = async () => {
        const gateway = new HelpRequestGateway();
        const helpRequest = await gateway.getHelpRequest(residentId, requestId);
        const helpRequestAssignee = helpRequest.assignedTo;
        setAssignee(helpRequestAssignee);
    };

    useEffect(getCallHandlers, []);
    useEffect(getHelpRequest, []);

    const handleAssignClick = async () => {
        const updateObj = { assignedTo: assignee };
        const gateway = new HelpRequestGateway();
        await gateway.patchHelpRequest(requestId, updateObj);
        //alert("Call handler reassigned"); // could probably have a better notification - disabling alert for the sake of cypress
        // magic happens that routes back to callbacks list page automatically
    };

    return (
        <Layout>
            <div>
                <Link href="/callback-list">
                    <a href="#" className="govuk-back-link" data-cy="back-button">
                        Back
                    </a>
                </Link>
                <h1 className="govuk-heading-l">Reassign this call</h1>
                <form action="/callback-list" method="post">
                    <h3 className="govuk-heading-m">Select a new call handler</h3>
                    <div className="govuk-form-group">
                        <Dropdown
                            dropdownItems={callHandlers}
                            value={assignee}
                            onChange={(callHandler) => {
                                setAssignee(callHandler);
                            }}
                            data-cy="call-handlers-dropdown"
                        />
                    </div>
                    <div className="govuk-grid-row" id="btn-bottom-panel">
                        <div className="govuk-grid-column-one-half">
                            <Button
                                text="Assign"
                                addClass="govuk-button govuk-!-margin-right-1"
                                onClick={handleAssignClick}
                                data-cy="assign-button"
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
        props: {}
    };
};
