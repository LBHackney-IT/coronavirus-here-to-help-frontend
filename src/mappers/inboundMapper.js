class InboundMapper {
    static ToCaseNotes = (caseNotes) => {
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

    static ToResident = (response) => {
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
}

export default InboundMapper;
