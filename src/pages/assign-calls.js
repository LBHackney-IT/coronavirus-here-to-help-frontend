import React from 'react';
import Layout from '../components/layout';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Button, Checkbox, Dropdown } from '../components/Form';
import { CallHandlerGateway } from '../gateways/call-handler';
import { CallbackGateway } from '../gateways/callback';
import { HelpRequestGateway } from '../gateways/help-request';
import { useRouter } from 'next/router';
import { callTypes } from '../helpers/constants';

export default function AssignCallsPage() {
    const router = useRouter();
    const [callHandlers, setCallHandlers] = useState([]);
    const [selectedCallHandlers, setSelectedCallHandlers] = useState([]);
    const [dropdownItems, setDropDownItems] = useState(['']);
    const [selectedCallType, setSelectedCallType] = useState('');
    const [selectedAssignment, setSelectedAssignment] = useState([]);
    const [errorsExist, setErrorsExist] = useState(null);

    const callbackGateway = new CallbackGateway();
    const gateway = new HelpRequestGateway();

    const getCallHandlers = async () => {
        const gateway = new CallHandlerGateway();
        const callHandlersList = await gateway.getCallHandler();

        setCallHandlers(callHandlersList);
    };

    useEffect(getCallHandlers, []);

    useEffect(() => {
        setDropDownItems(['Please choose'].concat(callTypes));
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

    const handleAssign = async (event) => {
        if (selectedAssignment.length == 0 || selectedCallHandlers.length == 0) {
            setErrorsExist(true);
        } else {
            let callbacks = await callbackGateway.getCallback({});
            if (selectedCallType != 'All') {
                callbacks = callbacks.filter((callback) => callback.callType == selectedCallType);
            }

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

            if (selectedAssignment == 'unassigned' && unassignedCallbacks.length > 0) {
                assignCases(unassignedCallbacks, assignmentCount);
            } else if (selectedAssignment == 'assigned' && assignedCallbacks.length > 0) {
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
                    <label className="govuk-label">Call types</label>
                    <Dropdown
                        dropdownItems={dropdownItems}
                        onChange={(type) => {
                            setSelectedCallType(type);
                        }}
                        data-testid="assign-call-type_dropdown"
                    />
                    <div className="govuk-hint">Select call help type</div>
                    <h3
                        className="govuk-heading-m"
                        style={{ marginRight: '1em', marginLeft: '.2em', marginTop: '2em' }}>
                        Assign to
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

                    <div className="govuk-checkboxes  lbh-checkboxes">
                        {callHandlers.map((callHandler) => {
                            return (
                                <Checkbox
                                    key={callHandler}
                                    label={callHandler}
                                    value={callHandler}
                                    onCheckboxChange={updateSelectedCallHandlers}
                                    data-testid="assign-call-handler-checkbox"
                                />
                            );
                        })}
                    </div>
                </div>

                <div className="govuk-grid-row" id="btn-bottom-panel">
                    <div className="govuk-grid-column-one-half">
                        <Button
                            text="Assign"
                            addClass="govuk-!-margin-right-1"
                            onClick={(event) => {
                                handleAssign(event);
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
