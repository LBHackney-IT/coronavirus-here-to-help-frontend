import { objectToQuery } from "../pages/api/utilityFuncs";
import { DefaultGateway } from "../gateways/default-gateway";

export class HelpRequestGateway extends DefaultGateway {
  async getHelpRequest(resident_id, request_id) {
    return await this.getFromUrl(
      `resident/${resident_id}/help_requests/${request_id}`
    );
  }
}
