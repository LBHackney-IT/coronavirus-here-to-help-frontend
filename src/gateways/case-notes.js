import { DefaultGateway } from '../gateways/default-gateway';
import InboundMapper from '../mappers/inboundMapper';

export class CaseNotesGateway extends DefaultGateway {
    async getCaseNotes(residentId) {
        const response = await this.getFromUrl(`residents/${residentId}/caseNotes`);
        return InboundMapper.ToCaseNotes(response);
    }
    async postCaseNote(residentId, helpRequestId, requestBody) {
        return await this.postToUrl(
            `resident/${residentId}/help-requests/${helpRequestId}/caseNotes`,
            requestBody
        );
    }
}

export default CaseNotesGateway;
