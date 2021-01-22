import axios from 'axios';
import { DefaultGateway } from '../gateways/default-gateway';
const { objectToQuery } = require('../helpers/utilityFuncs');

export class CallbackGateway extends DefaultGateway {
    async getCallback(queryParams) {
        return await this.getFromUrl(`callback_list${objectToQuery(queryParams)}`);
    }
}
