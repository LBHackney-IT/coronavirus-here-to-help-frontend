import { DefaultGateway } from '../gateways/default-gateway';
import InboundMapper from '../mappers/inboundMapper';

const ToRequest = (caseNote) => {
    return {CaseNote: JSON.stringify({
        note: caseNote.caseNote,
        author: caseNote.author,
        noteDate: caseNote.caseDate,
        helpNeeded:caseNote.helpNeeded
    })};
};
export class CaseNotesGateway extends DefaultGateway {
    async getCaseNotes(residentId) {
        const response = await this.getFromUrl(`residents/${residentId}/caseNotes`);
        return InboundMapper.ToCaseNotes(response);
    }
    async createCaseNote(residentId, helpRequestId, caseNoteObject) {
        return await this.postToUrl(
            `v4/residents/${residentId}/help-requests/${helpRequestId}/case-notes`,
            ToRequest(caseNoteObject)
        );
    }
}

export default CaseNotesGateway;
