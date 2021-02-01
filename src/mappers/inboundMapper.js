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
}

export default InboundMapper;
