import { DefaultGateway } from '../gateways/default-gateway';

export class GovNotifyGateway extends DefaultGateway {
    async sendText(phoneNumber, templateAlias, templateParams) {
        const response = await this.postToUrl(
            `gov-notify/${templateAlias}?phoneNumber=${phoneNumber}`,
            templateParams
        );
        return response;
    }
    async sendEmail(email, templateAlias, templateParams) {
        const response = await this.postToUrl(
            `gov-notify/${templateAlias}?email=${email}`,
            templateParams
        );
        return response;
    }

    async getTemplatePreview(templateAlias, templateParams) {
        const response = await this.postToUrl(
            `gov-notify/previewTemplate?templateType=${templateAlias}`,
            templateParams
        );
        return response;
    }

    async sendBulkText(reqBody) {
        const response = await this.postToUrl(`gov-notify/send-bulk-message`, reqBody);
        return response;
    }
}
