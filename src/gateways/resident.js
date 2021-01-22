import { DefaultGateway } from "../gateways/default-gateway";

export class ResidentGateway extends DefaultGateway {
  async getResident(residentId) {
    return await this.getFromUrl(`resident/${residentId}}`);
  }
  async getResidentsBySearchParams(postcode, firstName, lastName){
    return await this.getFromUrl(`residents?Postcode=${postcode}&FirstName=${firstName}&LastName=${lastName}`)
  }
}
