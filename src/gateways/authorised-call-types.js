import { DefaultGateway } from '../gateways/default-gateway';

export class AuthorisedCallTypesGateway extends DefaultGateway {
    async getAuthorisedHelpTypes() {
        const response = await this.getFromUrl(`help-types`);
        return response;
    }

    async getCallTypes() {
        let authorisedTypes = await this.getAuthorisedHelpTypes();
        return ['Contact Tracing', 'CEV', 'Welfare Call', 'Help Request', 'Link Work'].concat(
            authorisedTypes
        );
    }
}
