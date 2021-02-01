import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Layout from '../components/layout';
import CallbacksList from '../components/CallbacksList/CallbacksList';
import { Dropdown } from '../components/Form';
import { CallbackGateway } from '../gateways/callback';
import { CallHandlerGateway } from '../gateways/call-handler';
import { CallTypesGateway } from '../gateways/call-types';

function CallbacksListPage({ callTypes }) {
    const [callbacks, setCallbacks] = useState([]);
    const [subsetCallbacks, setSubsetCallbacks] = useState([]);
    const [callHandlers, setCallHandlers] = useState([]);
    const [dropdowns, setDropdowns] = useState({
        callType: 'All',
        assignedTo: 'Assigned to all'
    });

    const getCallBacks = async () => {
        // const queryParams = { ...dropdowns };
        // if (queryParams.callType === 'All') delete queryParams['callType'];
        // if (queryParams.assignedTo === 'Assigned to all') delete queryParams['assignedTo'];

        const gateway = new CallbackGateway();
        const callbackList = await gateway.getCallback({}); //queryParams);

        setCallbacks(callbackList);
        setSubsetCallbacks(callbackList);
    };

    const handleCallHandlerChange = (event) => {
        setDropdowns({ ...dropdowns, assignedTo: event });
    };

    const handleCallTypeChange = (event) => {
        console.log(callTypes)
        setDropdowns({ ...dropdowns, callType: event });
    };

    const getCallHandlers = async () => {
        const gateway = new CallHandlerGateway();
        const callHandlersList = await gateway.getCallHandler();

        callHandlersList.unshift('Assigned to all');

        setCallHandlers(callHandlersList);
    };

    const filterCallbacks = () => {
        let collection = callbacks;
        let queryParams = { ...dropdowns };
        if (queryParams.callType === 'All') delete queryParams['callType'];
        if (queryParams.assignedTo === 'Assigned to all') delete queryParams['assignedTo'];

        for (let param in queryParams)
            collection = collection.filter((item) => item[param] == queryParams[param]);

        setSubsetCallbacks(collection);
    };

    useEffect(getCallBacks, []);
    useEffect(getCallHandlers, []);
    useEffect(filterCallbacks, [dropdowns]);

    return (
        <Layout>
            <div>
                <Link href="/dashboard">
                    <a href="#" className="govuk-back-link">
                        Back
                    </a>
                </Link>
                <h1 className="govuk-heading-xl govuk-!-margin-bottom-2">Callback list</h1>
                <br />
                <h3 className="govuk-heading-m">Filter by Help Type:</h3>

                <div className="govuk-!-margin-bottom-5">
                    <div className="govuk-grid-row">
                        <div className="govuk-grid-column-one-third">
                            <Dropdown
                                dropdownItems={callTypes}
                                onChange={handleCallTypeChange}
                                data-testid="help-type-dropdown"
                            />
                        </div>
                        <div className="govuk-grid-column-one-third">
                            <Dropdown
                                dropdownItems={callHandlers}
                                onChange={handleCallHandlerChange}
                                data-testid="call-handlers-dropdown"
                            />
                        </div>
                    </div>
                </div>

                <CallbacksList callbacks={subsetCallbacks} />
            </div>
        </Layout>
    );
}

CallbacksListPage.getInitialProps = async (ctx) => {
    const gateway = new CallTypesGateway();
    const res = await gateway.getCallTypes();
    return { callTypes: res };
};

export default CallbacksListPage;
