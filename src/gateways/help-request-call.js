import { DefaultGateway } from '../gateways/default-gateway';

export class HelpRequestCallGateway extends DefaultGateway {
    async postHelpRequestCall(helpRequestId, requestBody) {
      return await this.postToUrl(`help-requests/${helpRequestId}/calls`, requestBody)
    }
}
