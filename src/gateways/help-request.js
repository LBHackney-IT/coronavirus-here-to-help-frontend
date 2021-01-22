import { DefaultGateway } from "../gateways/default-gateway";

export class HelpRequestGateway extends DefaultGateway {
  async getHelpRequest(residentId, requestId) {
    return await this.getFromUrl(
      `resident/${residentId}/helpRequests/${requestId}`
    );
  }
  async putHelpRequest(residentId, requestId, request_body) {
    return await this.putToUrl(
      `resident/${residentId}/helpRequests/${requestId}`,
      request_body
    );
  }
}
