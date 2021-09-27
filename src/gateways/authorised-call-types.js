import { DefaultGateway } from '../gateways/default-gateway';
import { CEV, CONTACT_TRACING, HELP_REQUEST, LINK_WORK, WELFARE_CALL } from '../helpers/constants';

export class AuthorisedCallTypesGateway extends DefaultGateway {
    async getAuthorisedHelpTypes() {
        const response = await this.getFromUrl(`help-types`);
        return response;
    }

    async getCallTypes() {
        let authorisedTypes = await this.getAuthorisedHelpTypes();
        return [CONTACT_TRACING, CEV, WELFARE_CALL, HELP_REQUEST, LINK_WORK].concat(
            authorisedTypes
        );
    }
}
