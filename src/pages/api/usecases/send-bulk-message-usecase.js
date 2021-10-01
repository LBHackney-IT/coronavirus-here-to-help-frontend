import {
    PRE_CALL_MESSAGE_TEMPLATE,
    SELF_ISOLATION_PRE_CALL_MESSAGE_TEMPLATE,
    EUSS_PRE_CALL_MESSAGE_TEMPLATE,
    EUSS_GROUP,
    EUSS,
    LINK_WORK_BULK_MESSAGE_TEMPLATE
} from '../../../helpers/constants';
import { GovNotifyGateway } from '../../../gateways/gov-notify-api-gateway';
import {
    containsPotentialMobileNumer,
    appendMobileContact
} from '../../../helpers/send-bulk-message-helper';
import { HereToHelpApiGateway } from '../../../gateways/here-to-help-api-gateway';

export class SendBulkMessagesUseCase {
    async sendMessages(reqBody) {
        const requestBody = JSON.parse(reqBody);

        try {
            const hereToHelpApiGateway = new HereToHelpApiGateway();
            const queryParam = requestBody.helpType == EUSS ? { IncludeType: 'EUSS' } : null;
            const callbacks = await hereToHelpApiGateway.request(
                [`v3/help-requests/callbacks`],
                'GET',
                null,
                queryParam
            );

            const { unassignedCallbacks, assignedCallbacks } = getAssignedAndUnassignedCallbacks(
                callbacks.data,
                requestBody.helpType
            );

            if (requestBody.assigned.value && requestBody.unassigned.value) {
                let allCallbacks = unassignedCallbacks.concat(assignedCallbacks);

                return await sendBulkSms(allCallbacks, requestBody);
            } else if (requestBody.assigned.value) {
                return await sendBulkSms(assignedCallbacks, requestBody);
            } else if (requestBody.unassigned.value) {
                return await sendBulkSms(unassignedCallbacks, requestBody);
            }
        } catch (error) {
            console.error(`Error sending bulk message: ${error}`);
            return error;
        }
    }
}

const getAssignedAndUnassignedCallbacks = (callbacks, helpType) => {
    let unassignedCallbacks = [];
    let assignedCallbacks = [];
    let updatedCallbacks = callbacks;
    if (helpType != 'All') {
        if (helpType == 'CEV') {
            updatedCallbacks = callbacks.filter(
                (callback) => callback.HelpNeeded.toLowerCase() == 'shielding'
            );
        } else {
            updatedCallbacks = callbacks.filter((callback) => callback.HelpNeeded == helpType);
        }
    }
    updatedCallbacks.forEach((callback) => {
        if (callback.AssignedTo == null || !callback.AssignedTo) {
            unassignedCallbacks.push(callback);
        } else {
            assignedCallbacks.push(callback);
        }
    });
    return { unassignedCallbacks, assignedCallbacks };
};

const sendBulkSms = async (callbacks, reqBody) => {
    const govNotifyGateway = new GovNotifyGateway();
    const hereToHelpApiGateway = new HereToHelpApiGateway();
    const textTemplateId =
        reqBody.textTemplateId == PRE_CALL_MESSAGE_TEMPLATE
            ? process.env.PRE_CALL_MESSAGE_TEMPLATE
            : reqBody.textTemplateId == SELF_ISOLATION_PRE_CALL_MESSAGE_TEMPLATE
            ? process.env.SELF_ISOLATION_PRE_CALL_MESSAGE_TEMPLATE
            : reqBody.textTemplateId == EUSS_PRE_CALL_MESSAGE_TEMPLATE
            ? process.env.EUSS_PRE_CALL_MESSAGE_TEMPLATE
            : reqBody.textTemplateId == LINK_WORK_BULK_MESSAGE_TEMPLATE
            ? process.env.LINK_WORK_BULK_MESSAGE_TEMPLATE
            : '';
    try {
        let mobileContacts = [];
        callbacks.forEach(async (callback) => {
            if (
                !containsPotentialMobileNumer(callback.ContactMobileNumber) &&
                !containsPotentialMobileNumer(callback.ContactTelephoneNumber)
            ) {
                try {
                    let caseNoteObject = {
                        CaseNote: JSON.stringify({
                            note: `Failed bulk text to ${callback.FirstName} due to an invalid mobile number`,
                            author: `Bulk message sent by ${reqBody.user}`,
                            noteDate: new Date().toGMTString(),
                            helpNeeded: callback.HelpNeeded
                        })
                    };

                    await hereToHelpApiGateway.request(
                        [
                            `v4`,
                            `residents`,
                            `${callback.ResidentId}`,
                            `help-requests`,
                            `${callback.Id}`,
                            `case-notes`
                        ],
                        'POST',
                        caseNoteObject
                    );
                } catch (error) {
                    console.log(`Error logging failed bulk message case note: ${error}`);
                }
            }
            if (containsPotentialMobileNumer(callback.ContactMobileNumber)) {
                mobileContacts = appendMobileContact(
                    mobileContacts,
                    callback.ContactMobileNumber,
                    callback
                );
            }
            if (containsPotentialMobileNumer(callback.ContactTelephoneNumber)) {
                mobileContacts = appendMobileContact(
                    mobileContacts,
                    callback.ContactTelephoneNumber,
                    callback
                );
            }
        });

        mobileContacts.forEach(async (contact) => {
            try {
                let { data } = await govNotifyGateway.sendSms(textTemplateId, contact.number, {
                    name: contact.name
                });
                if (data.id) {
                    let caseNoteObject = {
                        CaseNote: JSON.stringify({
                            note: `Text sent to ${contact.number}. Text id: ${data.id}. Text content: ${data.content.body}`,
                            author: `Bulk message sent by ${reqBody.user}`,
                            noteDate: new Date().toGMTString(),
                            helpNeeded: contact.helpNeeded
                        })
                    };
                    await hereToHelpApiGateway.request(
                        [
                            `v4`,
                            `residents`,
                            `${contact.residentId}`,
                            `help-requests`,
                            `${contact.helpRequestId}`,
                            `case-notes`
                        ],
                        'POST',
                        caseNoteObject
                    );
                }
            } catch (err) {
                try {
                    let { data } = await govNotifyGateway.sendSms(textTemplateId, contact.number, {
                        name: contact.name
                    });
                    if (data.id) {
                        let caseNoteObject = {
                            CaseNote: JSON.stringify({
                                note: `Text sent to ${contact.number}. Text id: ${data.id}. Text content: ${data.content.body}`,
                                author: `Bulk message sent by ${reqBody.user}`,
                                noteDate: new Date().toGMTString(),
                                helpNeeded: contact.helpNeeded
                            })
                        };
                        await hereToHelpApiGateway.request(
                            [
                                `v4`,
                                `residents`,
                                `${contact.residentId}`,
                                `help-requests`,
                                `${contact.helpRequestId}`,
                                `case-notes`
                            ],
                            'POST',
                            caseNoteObject
                        );
                    }
                } catch (err) {
                    console.log(`Error logging case note or sending ${err}`);
                    let caseNoteObject = {
                        CaseNote: JSON.stringify({
                            note: `Failed bulk text to ${contact.number}`,
                            author: `Bulk message sent by ${reqBody.user}`,
                            noteDate: new Date().toGMTString(),
                            helpNeeded: contact.helpNeeded
                        })
                    };
                    await hereToHelpApiGateway.request(
                        [
                            `v4`,
                            `residents`,
                            `${contact.residentId}`,
                            `help-requests`,
                            `${contact.helpRequestId}`,
                            `case-notes`
                        ],
                        'POST',
                        caseNoteObject
                    );
                    return err;
                }
            }
        });
        return { status: 200 };
    } catch (error) {
        console.log(`Error: ${error}`);
        return error;
    }
};
