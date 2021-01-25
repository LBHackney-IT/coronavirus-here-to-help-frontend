import { DefaultGateway } from '../gateways/default-gateway';

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

export class CaseNotesGateway extends DefaultGateway {
    async getCaseNotes(residentId) {
        const response = await this.getFromUrl(`residents/${residentId}/caseNotes`);
        return ToCaseNotes(response);
    }
}
