import { DefaultGateway } from '../gateways/default-gateway';
import InboundMapper from '../mappers/inboundMapper';

export class ResidentGateway extends DefaultGateway {
    async getResidentsBySearchParams(postcode, firstName, lastName) {
        const response = await this.getFromUrl(
            `v4/residents?Postcode=${postcode}&FirstName=${firstName}&LastName=${lastName}`
        );
        return response.map(InboundMapper.ToResident(response));
    }
    async getResident(residentId) {
        const response = await this.getFromUrl(`v4/residents/${residentId}`);
        return InboundMapper.ToResident(response);
    }
}
