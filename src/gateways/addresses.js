import { DefaultGateway } from '../gateways/default-gateway';

const ToAddresses = (response) => {
    return response?.map((response) => {
        return {
            addressFirstLine: response.line1,
            addressSecondLine: response.line2,
            addressThirdLine: response.line3,
            postCode: response.postcode,
            uprn: response.UPRN.toString()
        };
    });
};

export class AddressesGateway extends DefaultGateway {
    async getAddresses(postcode) {
        const response = await this.getFromUrl(`addresses/${postcode.replace(' ', '')}`);
        return ToAddresses(response.address);
    }
}
