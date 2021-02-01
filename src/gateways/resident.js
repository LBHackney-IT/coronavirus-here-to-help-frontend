import { DefaultGateway } from '../gateways/default-gateway';

const ToResident = (response) => {
    return {
        id: response.Id,
        firstName: response.FirstName,
        lastName: response.LastName,
        dobDay: response.DobDay,
        dobMonth: response.DobMonth,
        dobYear: response.DobYear,
        contactTelephoneNumber: response.ContactTelephoneNumber,
        contactMobileNumber: response.ContactMobileNumber,
        emailAddress: response.EmailAddress,
        addressFirstLine: response.AddressFirstLine,
        addressSecondLine: response.AddressSecondLine,
        addressThirdLine: response.AddressThirdLine,
        postCode: response.Postcode,
        uprn: response.Uprn,
        nhsNumber: response.NhsNumber,
    };
};

export class ResidentGateway extends DefaultGateway {
    async getResidentsBySearchParams(postcode, firstName, lastName) {
        const response = await this.getFromUrl(
            `v4/residents?Postcode=${postcode}&FirstName=${firstName}&LastName=${lastName}`
        );
        return response.map(ToResident);
    }
    async getResident(residentId) {
        const response = await this.getFromUrl(`v4/residents/${residentId}`);
        return ToResident(response);
    }
}
