import { getNonJsonCasenotesArray,getAuthor,getNote,getDate,isJSON, formatDate } from "../helpers/case_notes_helper";
class InboundMapper {
    static ToCaseNotes = (caseNotes) => {
        return caseNotes?.map((note) => {
            return {
                id: note.Id,
                caseNote: ToStandardisiedCaseNotesArray(note.CaseNote),
                helpRequestId: note.HelpRequestId,
                residentId: note.ResidentId,
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
    
const ToStandardisiedCaseNotesArray = (caseNotes) => {
    if(!caseNotes) return []
    let standardisiedCaseNotesArray = []
    if(isJSON(caseNotes)){
        let caseNoteObject = JSON.parse(caseNotes)
        if(caseNoteObject.length > 0){
            caseNoteObject.forEach(note => {
                note.formattedDate = formatDate(note.noteDate)
                standardisiedCaseNotesArray.push(note)
            });
        }
    }
    else if(!isJSON(caseNotes)){
        let nonJsonCaseNotesArray = getNonJsonCasenotesArray(caseNotes)
        nonJsonCaseNotesArray.forEach(nonJsonCaseNote => {
            if (nonJsonCaseNote) {
                let caseNoteObject = {"author": getAuthor(nonJsonCaseNote),
                                            "formattedDate": formatDate(getDate(nonJsonCaseNote)),
                                            "note": getNote(nonJsonCaseNote),
                                            "noteDate": getDate(nonJsonCaseNote)
                                            }
                standardisiedCaseNotesArray.push(caseNoteObject)

            }
        });
    }
    return standardisiedCaseNotesArray
}

export default InboundMapper;
