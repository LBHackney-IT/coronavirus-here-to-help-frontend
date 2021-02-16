import { DefaultGateway } from '../gateways/default-gateway';

const ToAddresses = (response) => {
    return response?.map((response) => {
        return {
            addressFirstLine: response.line1,
            addressSecondLine: response.line2,
            addressThirdLine: response.line3,
            postCode: response.postcode,
            uprn: response.UPRN?.toString()
        };
    });
};

export class AddressesGateway extends DefaultGateway {
    async getAddresses(postcode) {
        const response = await this.getFromUrl(`addresses/${postcode.replace(' ', '')}`);
        let addresses = [];
        for (let currentPage = 1; currentPage <= response.page_count; currentPage++) {
            const all_responses = await this.getFromUrl(`addresses/${postcode.replace(' ', '')}&page=${currentPage}`);
            addresses=addresses.concat(all_responses.address)            
        }
        return ToAddresses(addresses);
    }
}
