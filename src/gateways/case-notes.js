import { DefaultGateway } from '../gateways/default-gateway';
import InboundMapper from '../mappers/inboundMapper';

const ToRequest = (caseNote) => {
    return {CaseNote: JSON.stringify({
        note: caseNote.caseNote,
        author: caseNote.author,
        noteDate: caseNote.noteDate,
        helpNeeded:caseNote.helpNeeded
    })};
};
export class CaseNotesGateway extends DefaultGateway {
    async getResidentCaseNotes(residentId) {
        const response = await this.getFromUrl(`v4/residents/${residentId}/case-notes`);
        console.log("residentCaseNoteResponse", response)
        return InboundMapper.ToCaseNotes(response);
    }
    async getHelpRequestCaseNotes(residentId, helpRequestId) {
        const response = await this.getFromUrl(`v4/residents/${residentId}/help-requests/${helpRequestId}/case-notes`);
          console.log("helpRequestCaseNoteResponse",response)
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
