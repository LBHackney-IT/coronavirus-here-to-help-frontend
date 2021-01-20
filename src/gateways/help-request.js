import { DefaultGateway } from "../gateways/default-gateway";

export class HelpRequestGateway extends DefaultGateway {
  async getHelpRequest(resident_id, request_id) {
    return await this.getFromUrl(
      `resident/${resident_id}/help_requests/${request_id}`
    );
  }
  async putHelpRequest(resident_id, request_id, request_body) {
    return await this.putToUrl(
      `resident/${resident_id}/help_requests/${request_id}`,
      request_body
    );
  }
}
