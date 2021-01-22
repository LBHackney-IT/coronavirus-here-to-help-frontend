import axios from 'axios';
import { DefaultGateway } from '../gateways/default-gateway';
const { objectToQuery } = require('../helpers/utilityFuncs.js');

export class CallHandlerGateway extends DefaultGateway {
    async getCallHandler() {
        return await this.getFromUrl('callHandlers');
    }
}
