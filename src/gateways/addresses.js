import { DefaultGateway } from '../gateways/default-gateway';

export class AddressesGateway extends DefaultGateway {
    async getAddresses(postcode) {
        //     const response = await this.getFromUrl(`v4/residents/${residentId}`);
        //     return ToResident(response);
        // }
        
        return {
            address: [
                {
                    line1: 'Somewhere',
                    line2: 'over the rainbow',
                    line3: ' HACKNEY',
                    line4: ' LONDON',
                    town: 'LONDON',
                    postcode: 'E8 1DY',
                    UPRN: '123456789',
                    addressKey: '12345679',
                    usrn: 123456789,
                    addressStatus: 'Approved',
                    unitName: '',
                    buildingName: 'HACKNEY TOWN HALL',
                    buildingNumber: '',
                    street: 'over the rainbow'
                },
                {
                    line1: 'Somewhere',
                    line2: 'else',
                    line3: ' HACKNEY',
                    line4: ' LONDON',
                    town: 'LONDON',
                    postcode: 'E8 1DY',
                    UPRN: '123456749',
                    addressKey: '12445679',
                    usrn: 123456749,
                    addressStatus: 'Approved',
                    unitName: '',
                    buildingName: 'HACKNEY TOWN HALL',
                    buildingNumber: '',
                    street: 'else'
                }
            ]
        };
    }
}
