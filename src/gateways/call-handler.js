import { DefaultGateway } from '../gateways/default-gateway';

export class CallHandlerGateway extends DefaultGateway {
    async getCallHandler() {
        return await this.getFromUrl('callHandlers');
    }
}
