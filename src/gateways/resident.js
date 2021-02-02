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
        PostCode: response.postcode,
        uprn: response.Uprn,
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
        return response.map(ToResident);
    }
    async getResident(residentId) {
        const response = await this.getFromUrl(`v4/residents/${residentId}`);
        return ToResident(response);
    }
    async setResident(residentId, requestBody) {
        return await this.patchToUrl(`v4/residents/${residentId}`, ToPatchResidentObject(requestBody));
    }

}
