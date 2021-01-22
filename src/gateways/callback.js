import { DefaultGateway } from '../gateways/default-gateway';
const { objectToQueryAndParseToPascal } = require('../helpers/utilityFuncs');

const ToCallbackList = (callbacks) => {
    return callbacks?.map((callback) => {
        return {
            residentName: callback.ResidentName,
            residentId: callback.ResidentId,
            helpRequestId: callback.HelpRequestId,
            address: callback.Address,
            requestedDate: callback.RequestedDate,
            type: callback.Type,
            unsuccessfulCallAttempts: callback.UnsuccessfulCallAttempts,
            followUpRequired: callback.FollowUpRequired,
            assignedTo: callback.AssignedTo,
            rescheduledAt: callback.RescheduledAt
        };
    });
};

export class CallbackGateway extends DefaultGateway {
    async getCallback(queryParams) {
        const response = await this.getFromUrl(
            `callbackList${objectToQueryAndParseToPascal(queryParams)}`
        );
        const callbacksList = ToCallbackList(response);
        return callbacksList;
    }
}
