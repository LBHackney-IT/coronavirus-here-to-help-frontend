import { DefaultGateway } from '../gateways/default-gateway';

const ToDomain = (ch) => {
    return {
        id: ch.Id,
        name: ch.Name,
        email: ch.email
    };
};

export class CallHandlerGateway extends DefaultGateway {
    async getCallHandler() {
        const response = await this.getFromUrl(`v4/call-handlers`);
        return response.map(ToDomain);
    }
}
