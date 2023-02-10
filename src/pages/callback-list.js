import Link from 'next/link';
import React, { useEffect, useLayoutEffect, useState } from 'react';
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
    const [selectedCallType, setSelectedCallType] = useState('All');
    const [selectedCallHandler, setSelectedCallHandler] = useState('Assigned to all');

    const [ctasInput, setCtasInput] = useState('');

    useEffect(async () => {
        const authorisedCallTypesGateway = new AuthorisedCallTypesGateway();
        const authCallTypes = await authorisedCallTypesGateway.getCallTypes();
        setCallTypes([ALL].concat(authCallTypes.map((callType) => callType.name).sort()));
    }, []);

    const setCallTypeFromPersisted = () => {
        var persisted = sessionStorage.getItem('selectedCallType');
        if (persisted) {
            setSelectedCallType(persisted);
        }
    };

    const setCallHandlerFromPersisted = () => {
        var persisted = sessionStorage.getItem('selectedCallHandler');
        if (persisted) {
            setSelectedCallHandler(persisted);
        }
    };

    const persistCallType = (callType) => {
        if (callType.length > 0) {
            sessionStorage.setItem('selectedCallType', callType);
        }
    };

    const persistCallHandler = (callHandler) => {
        if (callHandler.length > 0) {
            sessionStorage.setItem('selectedCallHandler', callHandler);
        }
    };

    const getCallBacks = async () => {
        const gateway = new CallbackGateway();
        const callbackList = await gateway.getCallback({});

        setCallbacks(callbackList);
        setCallTypeFromPersisted();
        setCallHandlerFromPersisted();
    };

    const handleCallHandlerChange = (event) => {
        setSelectedCallHandler(event);
        persistCallHandler(event);
    };

    const handleCTASFilterChange = (newValue) => {
        setCtasInput(newValue);
    };

    const handleCallTypeChange = (event) => {
        setSelectedCallType(event);
        persistCallType(event);
    };

    const getCallHandlers = async () => {
        const gateway = new CallHandlerGateway();
        let callHandlersList = await gateway.getCallHandlers();

        callHandlersList = callHandlersList.map((c) => c.name);

        callHandlersList.sort();

        callHandlersList.unshift('Assigned to all');

        setCallHandlers(callHandlersList);
    };

    const filterCallbacks = () => {
        let collection = callbacks;
        const ctasId = ctasInput?.trim();
        const predicatesList = [];

        if (selectedCallType !== 'All')
            predicatesList.push((callback) => callback.callType === selectedCallType);

        if (selectedCallHandler !== 'Assigned to all')
            predicatesList.push((callback) => callback.assignedTo === selectedCallHandler);

        if (!ctasId.match(/^\s*$/))
            predicatesList.push((callback) => callback.nhsCtasId?.startsWith(ctasId));

        for (let predicate of predicatesList)
            collection = collection.filter((item) => predicate(item));

        setSubsetCallbacks(collection);
    };

    useEffect(getCallBacks, []);
    useEffect(getCallHandlers, []);
    useEffect(filterCallbacks, [ctasInput, selectedCallType, selectedCallHandler, callbacks]);

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
                                defaultValue={selectedCallType}
                                onChange={handleCallTypeChange}
                                data-testid="help-type-dropdown"
                            />
                        </div>
                        <div className="govuk-grid-column-one-third">
                            <Dropdown
                                label={'Assignee'}
                                dropdownItems={callHandlers}
                                defaultValue={selectedCallHandler}
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

export async function getServerSideProps() {
    return {
      props: {},
    }
}
