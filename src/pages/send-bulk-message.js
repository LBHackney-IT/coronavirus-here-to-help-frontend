import React from 'react';
import Layout from '../components/layout';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Button, Checkbox, Dropdown } from '../components/Form';
import { CallbackGateway } from '../gateways/callback';
import { useRouter } from 'next/router';
import {
    PRE_CALL_MESSAGE_TEMPLATE,
    SELF_ISOLATION_PRE_CALL_MESSAGE_TEMPLATE,
    EUSS_PRE_CALL_MESSAGE_TEMPLATE,
    LINK_WORK_BULK_MESSAGE_TEMPLATE,
    bulkMessageCallTypes,
    DEFAULT_DROPDOWN_OPTION,
    EUSS,
    WELFARE_CALL,
    LINK_WORK
} from '../helpers/constants';
import { GovNotifyGateway } from '../gateways/gov-notify';
import { unsafeExtractUser } from '../helpers/auth';
import { AuthorisedCallTypesGateway } from '../gateways/authorised-call-types';

export default function AssignCallsPage() {
    const router = useRouter();
    const user = unsafeExtractUser();
    const [assignedCallbacks, setAssignedCallbacks] = useState(null);
    const [unAssignedCallbacks, setUnAssignedCallbacks] = useState(null);
    const [previewTemplate, setTemplatePreview] = useState([]);
    const [unassigned, setUnassigned] = useState({
        value: false,
        sendSms: false
    });
    const [assigned, setAssigned] = useState({
        value: false,
        sendSms: false
    });
    const [helpType, setHelpType] = useState(null);
    const [callbacks, setCallbacks] = useState(null);
    const [dropdownItems, setDropDown] = useState(['']);
    const [errorsExist, setErrorsExist] = useState(false);
    const getCallbacks = async () => {
        const callbackGateway = new CallbackGateway();
        let callbacks = await callbackGateway.getCallback({});
        setCallbacks(callbacks);
    };

    const getPreview = async (value) => {
        let govNotifyGateway = new GovNotifyGateway();
        let response;
        if (value == WELFARE_CALL) {
            response = await govNotifyGateway.getTemplatePreview(
                SELF_ISOLATION_PRE_CALL_MESSAGE_TEMPLATE
            );
        } else if (value === EUSS) {
            response = await govNotifyGateway.getTemplatePreview(EUSS_PRE_CALL_MESSAGE_TEMPLATE);
        } else if (value === LINK_WORK) {
            response = await govNotifyGateway.getTemplatePreview(LINK_WORK_BULK_MESSAGE_TEMPLATE);
        } else {
            response = await govNotifyGateway.getTemplatePreview(PRE_CALL_MESSAGE_TEMPLATE);
        }
        setTemplatePreview(response.body);
    };

    const getAuthorisedCallTypes = async () => {
        const authorisedCallTypesGateway = new AuthorisedCallTypesGateway();
        let authCallTypes = await authorisedCallTypesGateway.getCallTypes();

        setDropDown(
            [DEFAULT_DROPDOWN_OPTION].concat(
                authCallTypes
                    .map((callType) => callType.name)
                    .filter((x) => bulkMessageCallTypes.includes(x))
            )
        );
    };

    useEffect(() => { getPreview(); }, []);
    useEffect(() => { getCallbacks(); }, []);
    useEffect(() => { getAuthorisedCallTypes(); }, []);

    const handleSend = async (event) => {
        if ((assigned.value || unassigned.value) && helpType) {
            event.preventDefault();
            let govNotifyGateway = new GovNotifyGateway();
            const textTemplateId =
                helpType == WELFARE_CALL
                    ? SELF_ISOLATION_PRE_CALL_MESSAGE_TEMPLATE
                    : helpType === EUSS
                    ? EUSS_PRE_CALL_MESSAGE_TEMPLATE
                    : helpType === LINK_WORK
                    ? LINK_WORK_BULK_MESSAGE_TEMPLATE
                    : PRE_CALL_MESSAGE_TEMPLATE;
            await govNotifyGateway.sendBulkText(
                JSON.stringify({
                    assigned: assigned,
                    unassigned: unassigned,
                    user: user.name,
                    helpType: helpType,
                    textTemplateId
                })
            );
            router.push('/dashboard');
        } else {
            setErrorsExist(true);
        }
    };

    const updateSendTextMessageCases = (value) => {
        if (value == 'unassigned') {
            let unassignedObject = unassigned.value
                ? { value: false, sendSms: false }
                : { value: true, sendSms: true };
            setUnassigned(unassignedObject);
        } else if (value == 'assigned') {
            let assignedObject = assigned.value
                ? { value: false, sendSms: false }
                : { value: true, sendSms: true };
            setAssigned(assignedObject);
        }
    };

    const updateHelpType = (value) => {
        setHelpType(value);
        let unassignedCallbacks = [];
        let assignedCallbacks = [];
        callbacks.forEach((callback) => {
            if (
                (callback.assignedTo == null && callback.callType == value) ||
                (!callback.assignedTo && callback.callType == value)
            ) {
                unassignedCallbacks.push(callback);
            } else if (callback.callType == value) {
                assignedCallbacks.push(callback);
            } else if (value == 'All') {
                if (callback.assignedTo == null || !callback.assignedTo) {
                    unassignedCallbacks.push(callback);
                } else {
                    assignedCallbacks.push(callback);
                }
            }
        });
        setAssignedCallbacks(assignedCallbacks);
        setUnAssignedCallbacks(unassignedCallbacks);
        getPreview(value);
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
                    data-testid="send-bulk-sms-form-validation-error">
                    <h2 className="govuk-error-summary__title" id="error-summary-title">
                        There is a problem
                    </h2>
                    <div className="govuk-error-summary__body">
                        <ul className="govuk-list govuk-error-summary__list">
                            <li>You have not completed the form</li>
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
                    Send bulk message
                </h1>
                <p
                    className="govuk-heading-m mandatoryQuestion"
                    style={{ marginRight: '1em', marginLeft: '.2em', marginTop: '2em' }}>
                    Please select a help type
                </p>
                <Dropdown
                    dropdownItems={dropdownItems}
                    onChange={updateHelpType}
                    selected="help type"
                    data-testid="bulk-message-dropdown"></Dropdown>
                <br />
                {helpType && (
                    <div className="govuk-!-margin-bottom-5">
                        <h3
                            className="govuk-heading-m mandatoryQuestion"
                            style={{ marginRight: '1em', marginLeft: '.2em', marginTop: '2em' }}>
                            Send text to
                        </h3>
                        <div className="govuk-checkboxes  lbh-checkboxes">
                            <Checkbox
                                key="unassigned-cases-checkbox"
                                label="Unassigned cases"
                                value="unassigned"
                                onCheckboxChange={updateSendTextMessageCases}
                            />

                            {unassigned.value && (
                                <div className="govuk-inset-text">
                                    Approximately {unAssignedCallbacks.length} unnasigned
                                </div>
                            )}
                            <br />

                            <Checkbox
                                key="assigned-cases-checkbox"
                                label="Assigned cases"
                                value="assigned"
                                onCheckboxChange={updateSendTextMessageCases}
                                data-testid="assigned-send-bulk-checkbox"
                            />

                            {assigned.value && (
                                <div className="govuk-inset-text">
                                    Approximately {assignedCallbacks.length} assigned
                                </div>
                            )}
                            <br />
                        </div>
                    </div>
                )}
                <br />
                <h3 className="govuk-heading-m"> Text content</h3>
                <div className="govuk-inset-text">{previewTemplate}</div>

                <br></br>
                <div className="govuk-grid-row" id="btn-bottom-panel">
                    <div className="govuk-grid-column-one-half">
                        <Button
                            text="Send"
                            addClass="govuk-!-margin-right-1"
                            onClick={(event) => {
                                handleSend(event);
                            }}
                            data-testid="send-bulk-message_button"
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

export async function getServerSideProps(context) {
    return {
      props: {},
    }
}
