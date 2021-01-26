import { DefaultGateway } from '../gateways/default-gateway';

export class CallHandlerGateway extends DefaultGateway {
    async getCallHandler() {
        return process.env.NEXT_PUBLIC_CALL_HANDLERS.split(",");
    }
}
