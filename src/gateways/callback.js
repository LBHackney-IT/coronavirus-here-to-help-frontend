import { DefaultGateway } from '../gateways/default-gateway';
import InboundMapper from '../mappers/inboundMapper';

export class CallbackGateway extends DefaultGateway {
    async getCallback(queryParams) {
        const response = await this.getFromUrl(`v3/help-requests/callbacks`);
        const callbacksList = InboundMapper.ToCallbackList(response);
        return callbacksList;
    }
}
