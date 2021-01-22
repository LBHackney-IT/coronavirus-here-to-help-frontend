import axios from 'axios';
import { objectToQuery } from '../utility/utilityFuncs';
import { DefaultGateway } from '../gateways/default-gateway';

export class CallbackGateway extends DefaultGateway {
    async getCallback(queryParams) {
        return await this.getFromUrl(`callback_list${objectToQuery(queryParams)}`);
    }
}
