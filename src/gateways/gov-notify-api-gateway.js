import { v4 as uuidv4 } from 'uuid';
var NotifyClient = require('notifications-node-client').NotifyClient;
const notifyClient = new NotifyClient(process.env.HERE_TO_HELP_NOTIFY_API_KEY);
export class GovNotifyGateway {
    async sendEmail(emailTemplateId, email, personalisation = {}) {
        try {
            const response = notifyClient.sendEmail(emailTemplateId, email, {
                personalisation: personalisation,
                reference: uuidv4()
            });
            return response;
        } catch (error) {
            console.log(`Semd email error: ${error}`);
            return error;
        }
    }

    async sendSms(smsTemplateId, phoneNumber, personalisation = {}) {
        try {
            const response = notifyClient.sendSms(smsTemplateId, phoneNumber, {
                personalisation: personalisation,
                reference: uuidv4()
            });
            return response;
        } catch (error) {
            console.log(`Send sms error:${error}`);
            return error;
        }
    }

    async getTemplatePreview(previewTemplateId, personalisation = {}) {
        try {
            const params = { ...personalisation };
            console.log('Params: ' + JSON.stringify(params));
            console.log('Params type: ' + typeof params);
            const response = await notifyClient.previewTemplateById(previewTemplateId, params);
            return response;
        } catch (error) {
            console.log(`Get template error: ${error}`);
            console.log('PreviewTemplateId: ' + previewTemplateId);
            console.log('personalisation:' + JSON.stringify(personalisation));
            return error;
        }
    }
}
