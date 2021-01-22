import axios from 'axios';
import { objectToQuery } from '../utility/utilityFuncs';
import { DefaultGateway } from '../gateways/default-gateway';

export class CallHandlerGateway extends DefaultGateway {
    async getCallHandler() {
        return await this.getFromUrl('call_handlers');
    }
}
