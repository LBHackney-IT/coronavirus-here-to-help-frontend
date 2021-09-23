import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Layout from '../components/layout';
import CallbacksList from '../components/CallbacksList/CallbacksList';
import { Dropdown, TextInput } from '../components/Form';
import { CallbackGateway } from '../gateways/callback';
import { CallHandlerGateway } from '../gateways/call-handler';
import { AuthorisedCallTypesGateway } from '../gateways/authorised-call-types';
import { ALL, WELFARE_CALL } from '../helpers/constants';

function CallbacksListPage() {
    const [callbacks, setCallbacks] = useState([]);
    const [subsetCallbacks, setSubsetCallbacks] = useState([]);
    const [callHandlers, setCallHandlers] = useState([]);
    const [callTypes, setCallTypes] = useState([]);
    const [dropdowns, setDropdowns] = useState({
        callType: 'All',
        assignedTo: 'Assigned to all'
    });

    const [ctasInput, setCtasInput] = useState('');

    useEffect(async () => {
        const gateway = new AuthorisedCallTypesGateway();
        const res = await gateway.getCallTypes();
        setCallTypes([ALL].concat(res.sort()));
    });

    const getCallBacks = async () => {
        const gateway = new CallbackGateway();
        const callbackList = await gateway.getCallback({});

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
            callType: event == 'Self Isolation' ? WELFARE_CALL : event
        });
    };

    const getCallHandlers = async () => {
        const gateway = new CallHandlerGateway();
        let callHandlersList = await gateway.getCallHandler();

        callHandlersList.sort();

        callHandlersList.unshift('Assigned to all');

        setCallHandlers(callHandlersList);
    };

    const filterCallbacks = () => {
        let collection = callbacks;
        const queryParams = { ...dropdowns, nhsCtasId: ctasInput?.trim() };
        const predicatesList = [];

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
                <h2 className="govuk-heading-m">Filter by:</h2>

                <div className="govuk-!-margin-bottom-5">
                    <div className="govuk-grid-row">
                        <div className="govuk-grid-column-one-third">
                            <Dropdown
                                label={'Help Type'}
                                dropdownItems={callTypes}
                                onChange={handleCallTypeChange}
                                data-testid="help-type-dropdown"
                            />
                        </div>
                        <div className="govuk-grid-column-one-third">
                            <Dropdown
                                label={'Assignee'}
                                dropdownItems={callHandlers}
                                onChange={handleCallHandlerChange}
                                data-testid="call-handlers-dropdown"
                            />
                        </div>
                        <div className="govuk-grid-column-one-third">
                            <TextInput
                                id={'ctasid-filter'}
                                label={'CTAS Id'}
                                name={'ctasid-filter'}
                                value={ctasInput}
                                onChange={handleCTASFilterChange}
                                data-testid="ctasid-filter"
                                placeholder="e.g. zd007fg4"
                            />
                        </div>
                    </div>
                </div>

                <CallbacksList callbacks={subsetCallbacks} />
            </div>
        </Layout>
    );
}

export default CallbacksListPage;
