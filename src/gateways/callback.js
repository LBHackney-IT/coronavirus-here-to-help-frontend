import { DefaultGateway } from '../gateways/default-gateway';
const { objectToQueryAndParseToPascal, isoDateToOtherDate } = require('../helpers/utilityFuncs');

const joinNameParts = (obj) => [obj.FirstName, obj.LastName].join(' ');
const joinAddressParts = (obj) =>
    [obj.AddressFirstLine, obj.AddressSecondLine, obj.AddressThirdLine].join(', ');
const unsuccessfulCalls = (collection) =>
    collection.filter((c) => /refused_to_engage|wrong_number/.test(c.CallOutcome)).length;

const ToCallbackList = (callbacks) => {
    return callbacks?.map((callback) => {
        return {
            residentName: joinNameParts(callback),
            residentId: callback.ResidentId,
            helpRequestId: callback.Id,
            address: joinAddressParts(callback),
            requestedDate: isoDateToOtherDate(callback.DateTimeRecorded), //remove this line from the component
            type: callback.HelpNeeded,
            unsuccessfulCallAttempts: unsuccessfulCalls(callback.HelpRequestCalls),
            followUpRequired: callback.CallbackRequired,
            assignedTo: callback.AssignedTo,
            rescheduledAt: callback.RescheduledAt
        };
    });
};

export class CallbackGateway extends DefaultGateway {
    async getCallback(queryParams) {
        const response = await this.getFromUrl(`api/v3/help-requests/callbacks`);
        const callbacksList = ToCallbackList(response);
        return callbacksList;
    }
}
