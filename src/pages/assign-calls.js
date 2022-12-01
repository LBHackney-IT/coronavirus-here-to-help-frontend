import React from 'react';
import Layout from '../components/layout';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Button, Checkbox } from '../components/Form';
import { CallHandlerGateway } from '../gateways/call-handler';
import { CallbackGateway } from '../gateways/callback';
import { HelpRequestGateway } from '../gateways/help-request';
import { useRouter } from 'next/router';
import { AuthorisedCallTypesGateway } from '../gateways/authorised-call-types';

export default function AssignCallsPage() {
    const router = useRouter();
    const [callHandlers, setCallHandlers] = useState([]);
    const [selectedCallHandlers, setSelectedCallHandlers] = useState([]);
    const [filteredCallTypes, setFilteredCallTypes] = useState([]);
    const [selectedCallTypes, setSelectedCallTypes] = useState([]);
    const [selectedAssignment, setSelectedAssignment] = useState([]);
    const [errorsExist, setErrorsExist] = useState(null);
    const callbackGateway = new CallbackGateway();
    const gateway = new HelpRequestGateway();

    const getCallHandlers = async () => {
        const gateway = new CallHandlerGateway();
        const callHandlersList = await gateway.getCallHandlers();

        setCallHandlers(callHandlersList.map((c) => c.name));
    };

    const getAuthorisedCallTypes = async () => {
        const authorisedCallTypesGateway = new AuthorisedCallTypesGateway();
        let authCallTypes = await authorisedCallTypesGateway.getCallTypes();
        setFilteredCallTypes(authCallTypes.map((callType) => callType.name));
    };

    useEffect(() => { 
        getCallHandlers();
        getAuthorisedCallTypes();
    }, []);

    const updateSelectedCallHandlers = (value) => {
        if (selectedCallHandlers.includes(value)) {
            let newSelectedCallHandlers = selectedCallHandlers.filter(
                (callHandler) => callHandler != value
            );
            setSelectedCallHandlers(newSelectedCallHandlers);
        } else {
            let newSelectedCallHandlers = selectedCallHandlers.concat([value]);
            setSelectedCallHandlers(newSelectedCallHandlers);
        }
    };

    const assignCases = (cases, assignmentCount) => {
        cases.forEach(async (callback) => {
            const [sortedHandlers] = Object.entries(assignmentCount).sort(
                ([, v1], [, v2]) => v1 - v2
            );
            assignmentCount[sortedHandlers[0]] += 1;

            const updateObj = { assignedTo: sortedHandlers[0] };
            await gateway.patchHelpRequest(callback.helpRequestId, updateObj);
        });
        return assignmentCount;
    };

    const formIsValid = () => {
        return (
            selectedAssignment.length > 0 &&
            selectedCallHandlers.length > 0 &&
            selectedCallTypes.length > 0
        );
    };

    const handleAssign = async () => {
        if (!formIsValid()) {
            setErrorsExist(true);
        } else {
            let callbacks = await callbackGateway.getCallback({});

            callbacks = callbacks.filter((callback) =>
                selectedCallTypes.includes(callback.callType)
            );

            let assignmentCount = {};
            selectedCallHandlers.forEach(
                (handler) => (assignmentCount = { ...assignmentCount, [handler]: 0 })
            );

            let unassignedCallbacks = [];
            let assignedCallbacks = [];
            callbacks.forEach((callback) => {
                if (callback.assignedTo == null || !callback.assignedTo) {
                    unassignedCallbacks.push(callback);
                } else {
                    assignedCallbacks.push(callback);
                }
            });

            if (selectedAssignment == 'unassigned') {
                assignCases(unassignedCallbacks, assignmentCount);
            } else if (selectedAssignment == 'assigned') {
                let toBeReassigned = [];
                const averageCaseCount = assignedCallbacks.length / selectedCallHandlers.length;
                assignedCallbacks.forEach((callback) => {
                    if (
                        selectedCallHandlers.includes(callback.assignedTo) &&
                        assignmentCount[callback.assignedTo] < averageCaseCount
                    ) {
                        assignmentCount[callback.assignedTo] += 1;
                    } else {
                        toBeReassigned.push(callback);
                    }
                });
                assignCases(toBeReassigned, assignmentCount);
            } else {
                let toBeReassigned = [];
                const averageCaseCount = callbacks.length / selectedCallHandlers.length;
                assignedCallbacks.forEach((callback) => {
                    if (
                        selectedCallHandlers.includes(callback.assignedTo) &&
                        assignmentCount[callback.assignedTo] < averageCaseCount
                    ) {
                        assignmentCount[callback.assignedTo] += 1;
                    } else {
                        toBeReassigned.push(callback);
                    }
                });
                let newAssignmentCount;
                if (toBeReassigned.length > 0) {
                    newAssignmentCount = assignCases(toBeReassigned, assignmentCount);
                }
                if (unassignedCallbacks.length > 0) {
                    assignCases(unassignedCallbacks, newAssignmentCount || assignmentCount);
                }
            }

            router.push('/callback-list');
        }
    };

    const updateSelectedAssignment = (value) => {
        if (selectedAssignment.includes(value)) {
            let newSelectedAssignment = selectedAssignment.filter(
                (assignment) => assignment != value
            );
            setSelectedAssignment(newSelectedAssignment);
        } else {
            let newSelectedAssignment = selectedAssignment.concat([value]);
            setSelectedAssignment(newSelectedAssignment);
        }
    };

    const selectedCallTypeChanged = (callType) => {
        let selectedValues = selectedCallTypes;

        if (selectedValues.includes(callType)) {
            selectedValues = selectedValues.filter((c) => c != callType);
        } else {
            selectedValues.push(callType);
        }

        setSelectedCallTypes(selectedValues);
    };

    return (
        <Layout>
            {errorsExist && (
                <div
                    className="govuk-error-summary"
                    aria-labelledby="error-summary-title"
                    role="alert"
                    tabIndex="-1"
                    data-module="govuk-error-summary"
                    data-testid="assign-call-validation-error">
                    <h2 className="govuk-error-summary__title" id="error-summary-title">
                        There is a problem
                    </h2>
                    <div className="govuk-error-summary__body">
                        <ul className="govuk-list govuk-error-summary__list">
                            <li>
                                <a href="#">You have not completed all the fields</a>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
            <div>
                <a
                    href="/admin"
                    className="govuk-back-link  lbh-back-link"
                    data-testid="assign-call-back_button">
                    Back
                </a>

                <h1 className="govuk-heading-xl" style={{ marginBottom: '20px' }}>
                    Assign calls
                </h1>

                <div className="govuk-!-margin-bottom-5">
                    <p
                        className="govuk-heading-m mandatoryQuestion"
                        style={{ marginRight: '1em', marginLeft: '.2em', marginTop: '2em' }}>
                        Which calls do you want to assign staff to today?
                    </p>
                    <div className="govuk-checkboxes  lbh-checkboxes">
                        {filteredCallTypes.map((type, index) => {
                            return (
                                <Checkbox
                                    key={"call-type-checkbox-" + index}
                                    label={type}
                                    value={type}
                                    onCheckboxChange={selectedCallTypeChanged}
                                    data-testid={`call-type-checkbox`}
                                />
                            );
                        })}
                    </div>
                    <h3
                        className="govuk-heading-m"
                        style={{ marginRight: '1em', marginLeft: '.2em', marginTop: '2em' }}>
                        Which status of calls should be assigned?
                    </h3>
                    <div className="govuk-checkboxes  lbh-checkboxes">
                        <Checkbox
                            key="unassigned-cases-checkbox"
                            label="Unassigned cases"
                            value="unassigned"
                            onCheckboxChange={updateSelectedAssignment}
                        />
                        <Checkbox
                            key="assigned-cases-checkbox"
                            label="Assigned cases"
                            value="assigned"
                            onCheckboxChange={updateSelectedAssignment}
                            data-testid="assign-call-assigned-checkbox"
                        />
                    </div>
                    <h3
                        className="govuk-heading-m"
                        style={{ marginRight: '1em', marginLeft: '.2em', marginTop: '2em' }}>
                        Select who is able to make calls today
                    </h3>

                    <ul
                        className="govuk-checkboxes  lbh-checkboxes"
                        style={{
                            display: 'flex',
                            flexWrap: 'Wrap'
                        }}>
                        {callHandlers.sort().map((callHandler) => {
                            return (
                                <Checkbox
                                    key={callHandler}
                                    label={callHandler}
                                    value={callHandler}
                                    containerStyle={{ flexBasis: '28%' }}
                                    onCheckboxChange={updateSelectedCallHandlers}
                                    data-testid="assign-call-handler-checkbox"
                                />
                            );
                        })}
                    </ul>
                </div>

                <div className="govuk-grid-row" id="btn-bottom-panel">
                    <div className="govuk-grid-column-one-half">
                        <Button
                            text="Assign"
                            addClass="govuk-!-margin-right-1"
                            onClick={() => {
                                handleAssign();
                            }}
                            data-testid="assign-call-assign_button"
                        />
                        <Link href="/admin">
                            <Button
                                text="Cancel"
                                addClass="govuk-button--secondary"
                                data-testid="assign-call-cancel_button"
                            />
                        </Link>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
