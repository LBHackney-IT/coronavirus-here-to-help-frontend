import { GovNotifyGateway } from '../../../gateways/gov-notify-api-gateway';
import {
    TEST_AND_TRACE_FOLLOWUP_EMAIL,
    TEST_AND_TRACE_FOLLOWUP_TEXT,
    PRE_CALL_MESSAGE_TEMPLATE,
    SELF_ISOLATION_PRE_CALL_MESSAGE_TEMPLATE,
    TEMPLATE_ID_ALIASES,
    EUSS_PRE_CALL_MESSAGE_TEMPLATE,
    LINK_WORK_BULK_MESSAGE_TEMPLATE
} from '../../../helpers/constants';

const templateAliasToIdDecoder = (tAlias) => {
    switch (tAlias) {
        case TEMPLATE_ID_ALIASES.EUSS_EMAIL_PRE_CALL_TEMPLATE:
            return process.env.EUSS_EMAIL_PRE_CALL_TEMPLATE;
        case TEMPLATE_ID_ALIASES.EUSS_PRE_CALL_MESSAGE_TEMPLATE:
            return process.env.EUSS_PRE_CALL_MESSAGE_TEMPLATE;
        case TEMPLATE_ID_ALIASES.EUSS_SMS_FOLLOW_UP_NO_ANSWER_TEMPLATE:
            return process.env.EUSS_SMS_FOLLOW_UP_NO_ANSWER_TEMPLATE;
        case TEMPLATE_ID_ALIASES.TEST_AND_TRACE_FOLLOWUP_TEXT: // why is this named different
            return process.env.TEST_AND_TRACE_FOLLOWUP_TEMPLATE_TEXT; // than this var?
        case TEMPLATE_ID_ALIASES.TEST_AND_TRACE_FOLLOWUP_EMAIL: // same here
            return process.env.TEST_AND_TRACE_FOLLOWUP_TEMPLATE_EMAIL;
        default:
            // would want this to be 'undefined' instead, but will keep empty
            // string for now, as it's unclear whether in the previous code it
            // was important or not.
            return '';
    }
};
export class SendMessageUseCase {
    async sendMessage(pathSegments, queryParams, reqBody) {
        const govNotifyGateway = new GovNotifyGateway();
        
        console.log("gov-notify UC ********************************************************")
        console.log(Buffer.isBuffer(reqBody))
        console.log(Object.getPrototypeOf(reqBody))
        console.log(reqBody)

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
                } else if (queryParams.templateType == LINK_WORK_BULK_MESSAGE_TEMPLATE) {
                    templateId = process.env.LINK_WORK_BULK_MESSAGE_TEMPLATE;
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
        } else {
            // else start
            const templateAliasName = pathSegments[0];

            if (queryParams.phoneNumber) {
                try {
                    const templateId = templateAliasToIdDecoder(templateAliasName);

                    let response = await govNotifyGateway.sendSms(
                        templateId,
                        queryParams.phoneNumber,
                        requestBody // I hope it's the correct format of key val pairs of templateParamName: value
                    );
                    return response;
                } catch (error) {
                    console.log(`Send text usecase error: ${error}`);
                    return error;
                }
            }
            if (queryParams.email) {
                try {
                    const templateId = templateAliasToIdDecoder(templateAliasName);

                    let response = await govNotifyGateway.sendEmail(
                        templateId,
                        queryParams.email,
                        requestBody
                    );
                    return response;
                } catch (error) {
                    console.log(`Send email usecase error: ${error}`);
                    return error;
                }
            }
            // else end
        }
    }
}
