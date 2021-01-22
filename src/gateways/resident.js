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
        postCode: response.PostCode,
        recordStatus: response.RecordStatus,
        uprn: response.Uprn,
        ward: response.Ward,
        keyNotes: response.KeyNotes,
        caseNotes: ToCaseNotes(response.CaseNotes)
    };
};

const ToCaseNotes = (caseNotes) => {
    return caseNotes?.map((note) => {
        return {
            id: note.Id,
            caseNote: note.CaseNote,
            helpRequestId: note.HelpRequestId,
            residentId: note.ResidentId,
            createdAt: note.CreatedAt
        };
    });
};

export class ResidentGateway extends DefaultGateway {
    async getResidentsBySearchParams(postcode, firstName, lastName) {
        const response = await this.getFromUrl(
            `residents?Postcode=${postcode}&FirstName=${firstName}&LastName=${lastName}`
        );
        const residents = response.map((res) => ToResident(res));
        return residents;
    }
    async getResident(residentId) {
        const response = await this.getFromUrl(`residents/${residentId}`);
        return ToResident(response);
    }
}
