import { DefaultGateway } from '../gateways/default-gateway';
import { IS_EUSS_ENABLED } from '../helpers/constants';

export class CallTypesGateway extends DefaultGateway {
    async getCallTypes() {
        return [
            'All',
            'Help Request',
            'CEV',
            'Self Isolation',
            'Contact Tracing',
            'Link Work',
            ...(IS_EUSS_ENABLED ? ['EUSS'] : [])
        ];
    }
}
