import { DefaultGateway } from '../gateways/default-gateway';

export class AuthorisedCallTypesGateway extends DefaultGateway {
    async getAuthorisedHelpTypes() {
        const response = await this.getFromUrl(`help-types`);
        return response;
    }

    async getCallTypes() {
        let authorisedTypes = await this.getAuthorisedHelpTypes();
        return [
            { name: 'Contact Tracing' },
            { name: 'CEV' },
            { name: 'Welfare Call' },
            { name: 'Help Request' },
            { name: 'Link Work', subtype: 'Repairs' }
        ].concat(authorisedTypes);
    }
}
