import { DefaultGateway } from '../gateways/default-gateway';
import InboundMapper from '../mappers/inboundMapper';

const ToPatchResidentObject = (response) => {
    let object = {
        ResidentId: response.Id,
        FirstName: response.firstName,
        LastName: response.lastName,
        DobDay: response.dobDay,
        DobMonth: response.dobMonth,
        DobYear: response.dobYear,
        ContactTelephoneNumber: response.contactTelephoneNumber,
        ContactMobileNumber: response.contactMobileNumber,
        EmailAddress: response.emailAddress,
        AddressFirstLine: response.addressFirstLine,
        AddressSecondLine: response.addressSecondLine,
        AddressThirdLine: response.addressThirdLine,
        PostCode: response.postCode,
        Uprn: response.uprn,
        nhsNumber: response.NhsNumber,
    }

    Object.keys(object).forEach((key) => (object[key] == null) && delete object[key]);

    return JSON.stringify(object);
}

export class ResidentGateway extends DefaultGateway {
    async getResidentsBySearchParams(postcode, firstName, lastName) {
        const response = await this.getFromUrl(
            `v4/residents?Postcode=${postcode}&FirstName=${firstName}&LastName=${lastName}`
        );
        return response.map(InboundMapper.ToResident);
    }
    async getResident(residentId) {
        const response = await this.getFromUrl(`v4/residents/${residentId}`);
        return InboundMapper.ToResident(response);
    }
    async setResident(residentId, requestBody) {
        console.log("request body", ToPatchResidentObject(requestBody));
        return await this.patchToUrl(`v4/residents/${residentId}`, ToPatchResidentObject(requestBody));
    }
    async postResident(requestBody) {
        return await this.postToUrl(`v4/residents/`, ToPatchResidentObject(requestBody));
    }

}
