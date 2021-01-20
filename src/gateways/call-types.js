export class CallTypesGateway {
    async getCallTypes() {
        return [
            "All",
            "Help Request",
            "CEV",
            "Welfare",
            "Contact Tracing",
        ];
    }
}