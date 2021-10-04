import { DefaultGateway } from '../gateways/default-gateway';

export class GovNotifyGateway extends DefaultGateway {
    async sendText(phoneNumber, message) {
      const response = await this.postToUrl(`gov-notify/${message}?phoneNumber=${phoneNumber}`);
      return response;
    }
    async sendEmail(email, message) {
      const response = await this.postToUrl(`gov-notify/${message}?email=${email}`);

      return response;
    }

    async getTemplatePreview(template, templateParams) {
        const response = await this.postToUrl(
            `gov-notify/previewTemplate?templateType=${template}`,
            templateParams
        );
      return response;
    }

    async sendBulkText(reqBody) {
      const response = await this.postToUrl(`gov-notify/send-bulk-message`, reqBody);
      return response;
    }
}
