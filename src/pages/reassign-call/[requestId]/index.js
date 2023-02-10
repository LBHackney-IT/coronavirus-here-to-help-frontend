import React, { useEffect, useState } from 'react';
import { Button, Dropdown } from '../../../components/Form';
import Layout from '../../../components/layout';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { CallHandlerGateway } from '../../../gateways/call-handler';
import { HelpRequestGateway } from '../../../gateways/help-request';
import { NOT_ASSIGNED } from '../../../helpers/constants';

export default function ReassignCalls() {
    const router = useRouter();
    const { requestId, residentId } = router.query;

    const [assignee, setAssignee] = useState('');
    const [callHandlers, setCallHandlers] = useState([]);

    const getCallHandlers = async () => {
        const gateway = new CallHandlerGateway();
        let callHandlerList = await gateway.getCallHandlers();

        callHandlerList = callHandlerList.map((c) => c.name);
        callHandlerList.sort();
        callHandlerList.unshift(NOT_ASSIGNED);
        setCallHandlers(callHandlerList);
    };

    const getHelpRequest = async () => {
        const gateway = new HelpRequestGateway();
        const helpRequest = await gateway.getHelpRequest(residentId, requestId);
        const helpRequestAssignee =
            helpRequest.assignedTo !== '' ? helpRequest.assignedTo : NOT_ASSIGNED;
        setAssignee(helpRequestAssignee);
    };

    const handleOnSubmit = async (event) => {
        event.preventDefault();

        const gateway = new HelpRequestGateway();

        const updateObj = { assignedTo: assignee === NOT_ASSIGNED ? '' : assignee };

        await gateway.patchHelpRequest(requestId, updateObj);

        router.back();
    };

    useEffect(() => {
        getCallHandlers();
        getHelpRequest();
    }, []);

    return (
        <Layout>
            <div>
                <Link href="/callback-list">
                    <a className="govuk-back-link" data-testid="reassign-call-back_button">
                        Back
                    </a>
                </Link>
                <h1 className="govuk-heading-l">Reassign this call</h1>
                <form onSubmit={handleOnSubmit}>
                    <h3 className="govuk-heading-m">Select a new call handler</h3>
                    <div className="govuk-form-group">
                        <Dropdown
                            dropdownItems={callHandlers}
                            value={assignee}
                            onChange={(callHandler) => {
                                setAssignee(callHandler);
                            }}
                            data-testid="reassign-call-handlers-dropdown"
                        />
                    </div>
                    <div className="govuk-grid-row" id="btn-bottom-panel">
                        <div className="govuk-grid-column-one-half">
                            <Button
                                text="Assign"
                                type="submit"
                                addClass="govuk-button govuk-!-margin-right-1"
                                data-testid="reassign-call-assign_button"
                            />
                            <Link href="/callback-list">
                                <a className="govuk-button govuk-button--secondary" data-testid="reassign-call-cancel_button">
                                    Cancel
                                </a>
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </Layout>
    );
}

export async function getServerSideProps() {
    return {
      props: {},
    }
}
