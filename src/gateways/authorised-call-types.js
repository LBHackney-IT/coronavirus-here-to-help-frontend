import { DefaultGateway } from '../gateways/default-gateway';

export class AuthorisedCallTypesGateway extends DefaultGateway {
    async getAuthorisedHelpTypes() {
        const response = await this.getFromUrl(`help-types`);
        return response;
    }

    async getCallTypes() {
        let authorisedTypes = await this.getAuthorisedHelpTypes();
        return ['Help Request', 'CEV', 'Self Isolation', 'Contact Tracing', 'Link Work'].concat(
            authorisedTypes
        );
    }
}
