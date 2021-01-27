import { DefaultGateway } from '../gateways/default-gateway';

export class CallHandlerGateway extends DefaultGateway {
    async getCallHandler() {
        if (process.env.NEXT_PUBLIC_APP_STAGE == 'dev') return ['Person A', 'Person B', 'Person C', 'Person D'];
        return process.env.NEXT_PUBLIC_CALL_HANDLERS
            ? process.env.NEXT_PUBLIC_CALL_HANDLERS.split(',')
            : [];
    }
}
