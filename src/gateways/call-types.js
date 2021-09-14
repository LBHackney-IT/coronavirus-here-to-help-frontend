import { DefaultGateway } from '../gateways/default-gateway';

export class CallTypesGateway extends DefaultGateway {
    async getCallTypes() {
        return [
            'All',
            'Help Request',
            'CEV',
            'Self Isolation',
            'Contact Tracing',
            'Link Work',
            ...(process.env.NEXT_PUBLIC_IS_EUSS_ENABLED ? ['EUSS'] : [])
        ];
    }
}
