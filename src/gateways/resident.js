import { DefaultGateway } from '../gateways/default-gateway';

const ToResident = (response) => {
    return {
        firstName: response.FirstName,
        id: response.Id,
        lastName: response.LastName,
        addressFirstLine: response.AddressFirstLine,
        addressSecondLine: response.AddressSecondLine,
        addressThirdLine: response.AddressThirdLine,
        consentToShare: response.ConsentToShare,
        contactMobileNumber: response.ContactMobileNumber,
        contactTelephoneNumber: response.ContactTelephoneNumber,
        dateOfBirth: response.DateOfBirth,
        emailAddress: response.EmailAddress,
        gpSurgeryDetails: response.GpSurgeryDetails,
        isPharmacistAbleToDeliver: response.IsPharmacistAbleToDeliver,
        nameAddressPharmacist: response.NameAddressPharmacist,
        nhsNumber: response.NhsNumber,
        numberOfChildrenUnder18: response.NumberOfChildrenUnder18,
        postCode: response.Postcode,
        recordStatus: response.RecordStatus,
        uprn: response.Uprn,
        ward: response.Ward,
        keyNotes: response.KeyNotes,
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
