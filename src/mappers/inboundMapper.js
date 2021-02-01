import {CEV, SHIELDING} from '../helpers/constants';

const isoDateToOtherDate = (dateString) => dateString.split('T')[0];
const joinNameParts = (obj) => [obj.FirstName, obj.LastName].join(' ');
const joinAddressParts = (obj) =>
    [obj.AddressFirstLine, obj.AddressSecondLine, obj.AddressThirdLine].join(', ');
const unsuccessfulCalls = (collection) =>
    collection.filter((c) => /refused_to_engage|wrong_number/.test(c.CallOutcome)).length;
const replaceIfShielding = (helpType) => helpType !== SHIELDING ? helpType : CEV;

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

    static ToCallbackList = (callbacks) => {
        return callbacks?.map((callback) => {
            return {
                residentName: joinNameParts(callback),
                residentId: callback.ResidentId,
                helpRequestId: callback.Id,
                address: joinAddressParts(callback),
                requestedDate: callback.DateTimeRecorded ? isoDateToOtherDate(callback.DateTimeRecorded):"", //remove this line from the component
                callType: replaceIfShielding(callback.HelpNeeded),
                unsuccessfulCallAttempts: unsuccessfulCalls(callback.HelpRequestCalls),
                followUpRequired: callback.CallbackRequired,
                assignedTo: callback.AssignedTo,
                rescheduledAt: callback.RescheduledAt
            };
        });
    };
}

export default InboundMapper;
