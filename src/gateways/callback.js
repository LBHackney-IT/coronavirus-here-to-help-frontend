import { DefaultGateway } from '../gateways/default-gateway';
const { objectToQueryAndParseToPascal } = require('../helpers/utilityFuncs');

export class CallbackGateway extends DefaultGateway {
    async getCallback(queryParams) {
        return await this.getFromUrl(`callbackList${objectToQueryAndParseToPascal(queryParams)}`);
    }
}
