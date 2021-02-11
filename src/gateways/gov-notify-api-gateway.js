import { v4 as uuidv4 } from 'uuid';
import {TEST_AND_TRACE_FOLLOWUP_TEXT, TEST_AND_TRACE_FOLLOWUP_EMAIL} from '../helpers/constants'
var NotifyClient = require('notifications-node-client').NotifyClient

export class GovNotifyGateway {
    async request(pathSegments, queryParams) {
    try{
      const notifyClient = new NotifyClient(process.env.HERE_TO_HELP_DEV_NOTIFY_API_KEY)
      if(queryParams.phoneNumber){
        const templateId = (pathSegments[0] == TEST_AND_TRACE_FOLLOWUP_TEXT) ? process.env.TEST_AND_TRACE_FOLLOWUP_TEMPLATE_TEXT : ""

        let response = await notifyClient.sendSms(templateId, queryParams.phoneNumber, {
          personalisation:{},
          reference: uuidv4()
        })
        return response;
      }
      if(queryParams.email){
            const templateId = (pathSegments[0] == TEST_AND_TRACE_FOLLOWUP_EMAIL) ? process.env.TEST_AND_TRACE_FOLLOWUP_TEMPLATE_EMAIL : ""
            const response = notifyClient.sendEmail(templateId, queryParams.email, {
              personalisation: {},
              reference: uuidv4()
            })
            return response;
      }
      if(pathSegments[0] == "previewTemplate"){
            let templateId
            if((queryParams.templateType == TEST_AND_TRACE_FOLLOWUP_TEXT)){

              templateId =  process.env.TEST_AND_TRACE_FOLLOWUP_TEMPLATE_TEXT

            }else if(queryParams.templateType == TEST_AND_TRACE_FOLLOWUP_EMAIL){

              templateId = process.env.TEST_AND_TRACE_FOLLOWUP_TEMPLATE_EMAIL

            } 

            const response = await notifyClient.previewTemplateById(templateId,{ })
            return response;
         }
    } catch(err){
      console.log("Notify client error response", err)
      return err
    }

  }
}
