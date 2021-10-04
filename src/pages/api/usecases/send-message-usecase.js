import { GovNotifyGateway } from '../../../gateways/gov-notify-api-gateway';
import {
    TEST_AND_TRACE_FOLLOWUP_EMAIL,
    TEST_AND_TRACE_FOLLOWUP_TEXT,
    PRE_CALL_MESSAGE_TEMPLATE,
    SELF_ISOLATION_PRE_CALL_MESSAGE_TEMPLATE,
    TEMPLATE_ID_ALIASES
} from '../../../helpers/constants';

const templateAliasToIdDecoder = (tAlias) => {
    switch (tAlias) {
        case TEMPLATE_ID_ALIASES.EUSS_EMAIL_PRE_CALL_TEMPLATE:
            return process.env.EUSS_EMAIL_PRE_CALL_TEMPLATE;
        case TEMPLATE_ID_ALIASES.EUSS_PRE_CALL_MESSAGE_TEMPLATE:
            return process.env.EUSS_PRE_CALL_MESSAGE_TEMPLATE;
        case TEMPLATE_ID_ALIASES.EUSS_SMS_FOLLOW_UP_NO_ANSWER_TEMPLATE:
            return process.env.EUSS_SMS_FOLLOW_UP_NO_ANSWER_TEMPLATE;
        default:
            return undefined;
    }
};
export class SendMessageUseCase {
    async sendMessage(pathSegments, queryParams, reqBody) {
        const govNotifyGateway = new GovNotifyGateway();
        if (queryParams.phoneNumber) {
            try {
                const templateId =
                    pathSegments[0] == TEST_AND_TRACE_FOLLOWUP_TEXT
                        ? process.env.TEST_AND_TRACE_FOLLOWUP_TEMPLATE_TEXT
                        : '';
                let response = await govNotifyGateway.sendSms(
                    templateId,
                    queryParams.phoneNumber,
                    {}
                );
                return response;
            } catch (error) {
                console.log(`Send text usecase error: ${error}`);
                return error;
            }
        }
        if (queryParams.email) {
            try {
                const templateId =
                    pathSegments[0] == TEST_AND_TRACE_FOLLOWUP_EMAIL
                        ? process.env.TEST_AND_TRACE_FOLLOWUP_TEMPLATE_EMAIL
                        : '';
                let response = await govNotifyGateway.sendEmail(templateId, queryParams.email);
                return response;
            } catch (error) {
                console.log(`Send email usecase error: ${error}`);
                return error;
            }
        }

        if (pathSegments[0] == 'previewTemplate') {
            try {
                let templateId;
                if (queryParams.templateType == TEST_AND_TRACE_FOLLOWUP_TEXT) {
                    templateId = process.env.TEST_AND_TRACE_FOLLOWUP_TEMPLATE_TEXT;
                } else if (queryParams.templateType == TEST_AND_TRACE_FOLLOWUP_EMAIL) {
                    templateId = process.env.TEST_AND_TRACE_FOLLOWUP_TEMPLATE_EMAIL;
                } else if (queryParams.templateType == PRE_CALL_MESSAGE_TEMPLATE) {
                    templateId = process.env.PRE_CALL_MESSAGE_TEMPLATE;
                } else if (queryParams.templateType == SELF_ISOLATION_PRE_CALL_MESSAGE_TEMPLATE) {
                    templateId = process.env.SELF_ISOLATION_PRE_CALL_MESSAGE_TEMPLATE;
                } else {
                    // the plan is to slowly refactor this into a single switch case
                    templateId = templateAliasToIdDecoder(queryParams.templateType);
                }

                // if template params are provided, then use them, else fallback onto legacy dummy request param.
                const templateParams =
                    reqBody && Object.keys(reqBody).length !== 0
                        ? reqBody
                        : { name: '(first name)' };

                const response = await govNotifyGateway.getTemplatePreview(
                    templateId,
                    templateParams
                );
                return response;
            } catch (error) {
                console.log(`Get template usecase error: ${error}`);
                return error;
            }
        }
    }
}
