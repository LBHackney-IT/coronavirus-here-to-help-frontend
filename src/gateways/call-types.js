import { DefaultGateway } from "../gateways/default-gateway";

export class CallTypesGateway extends DefaultGateway {
    async getCallTypes() {
        return [
            "All",
            "Help Request",
            "CEV",
            "Self Isolation",
            "Contact Tracing",
        ];
    }
}