import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Layout from '../components/layout';
import CallbacksList from '../components/CallbacksList/CallbacksList';
import { Dropdown, TextInput } from '../components/Form';
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

    const [ctasInput, setCtasInput] = useState('');

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

    const handleCTASFilterChange = (newValue) => {
        setCtasInput(newValue);
    };

    const handleCallTypeChange = (event) => {
        setDropdowns({
            ...dropdowns,
            callType: event == 'Self Isolation' ? 'Welfare Call' : event
        });
    };

    const getCallHandlers = async () => {
        const gateway = new CallHandlerGateway();
        const callHandlersList = await gateway.getCallHandler();

        callHandlersList.unshift('Assigned to all');

        setCallHandlers(callHandlersList);
    };

    const filterCallbacks = () => {
        let collection = callbacks;
        const queryParams = { ...dropdowns, nhsCtasId: ctasInput };
        const predicatesList = [];

        console.log(queryParams);

        if (queryParams.callType !== 'All')
            predicatesList.push((callback) => callback.callType === queryParams.callType);

        if (queryParams.assignedTo !== 'Assigned to all')
            predicatesList.push((callback) => callback.assignedTo === queryParams.assignedTo);

        if (!queryParams.nhsCtasId.match(/^\s*$/))
            predicatesList.push((callback) =>
                callback.nhsCtasId?.startsWith(queryParams.nhsCtasId)
            );

        for (let predicate of predicatesList)
            collection = collection.filter((item) => predicate(item));

        setSubsetCallbacks(collection);
    };

    useEffect(getCallBacks, []);
    useEffect(getCallHandlers, []);
    useEffect(filterCallbacks, [dropdowns, ctasInput]);

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
                        <div className="govuk-grid-column-one-third">
                            <TextInput
                                id={'ctas-id-filter'}
                                name={'ctas-id-filter'}
                                value={ctasInput}
                                onChange={handleCTASFilterChange}
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
