import { DefaultGateway } from '../gateways/default-gateway';
import {
    CEV,
    CONTACT_TRACING,
    HELP_REQUEST,
    LINK_WORK,
    WELFARE_CALL,
    REPAIRS
} from '../helpers/constants';

export class AuthorisedCallTypesGateway extends DefaultGateway {
    async getAuthorisedHelpTypes() {
        const response = await this.getFromUrl(`help-types`);
        return response;
    }

    async getCallTypes() {
        let authorisedTypes = await this.getAuthorisedHelpTypes();
        return [
            { name: CONTACT_TRACING },
            { name: CEV },
            { name: WELFARE_CALL },
            { name: HELP_REQUEST },
            { name: LINK_WORK, subtypes: [REPAIRS] }
        ].concat(authorisedTypes);
    }
}
