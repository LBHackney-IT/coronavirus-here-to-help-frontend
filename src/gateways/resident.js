import { DefaultGateway } from '../gateways/default-gateway';

export class ResidentGateway extends DefaultGateway {
    async getResident(residentId) {
        return await this.getFromUrl(`residents/${residentId}`);
    }
}
