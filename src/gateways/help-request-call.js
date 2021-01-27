import { DefaultGateway } from '../gateways/default-gateway';

export class HelpRequestCallGateway extends DefaultGateway {
    async postHelpRequestCall(helpRequestId, requestBody) {
      return await this.postToUrl(`v3/help-requests/${helpRequestId}/calls`, requestBody)
    }
}
