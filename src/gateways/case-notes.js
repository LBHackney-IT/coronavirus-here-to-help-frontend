import { DefaultGateway } from '../gateways/default-gateway';
import InboundMapper from '../mappers/inboundMapper';

export class CaseNotesGateway extends DefaultGateway {
    async getCaseNotes(residentId) {
        const response = await this.getFromUrl(`residents/${residentId}/caseNotes`);
        return InboundMapper.ToCaseNotes(response);
    }
    async postCaseNote(residentId, helpRequestId, requestBody) {
        return await this.postToUrl(
            // added an "s" to "resident"!!! As far as I'm aware this API endpoint doesn't exist yet, so it should be fine, but putting this message here just in case...
            `residents/${residentId}/help-requests/${helpRequestId}/caseNotes`,
            requestBody
        );
    }
}

export default CaseNotesGateway;
