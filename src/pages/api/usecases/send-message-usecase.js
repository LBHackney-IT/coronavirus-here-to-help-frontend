import {  GovNotifyGateway } from "../../../gateways/gov-notify-api-gateway";
import { TEST_AND_TRACE_FOLLOWUP_EMAIL, TEST_AND_TRACE_FOLLOWUP_TEXT, PRE_CALL_MESSAGE_TEMPLATE } from "../../../helpers/constants";
export class SendMessageUseCase{
  async sendMessage( pathSegments, queryParams){
    const govNotifyGateway = new GovNotifyGateway()
      if(queryParams.phoneNumber){
        try {
          const templateId = (pathSegments[0] == TEST_AND_TRACE_FOLLOWUP_TEXT) ? process.env.TEST_AND_TRACE_FOLLOWUP_TEMPLATE_TEXT : ""
          let response = await govNotifyGateway.sendSms(templateId, queryParams.phoneNumber, {})
          return response
        } catch (error) {
          console.log(`Send text usecase error: ${error}`)
          return error
        }
      }
      if(queryParams.email){
        try {
          const templateId = (pathSegments[0] == TEST_AND_TRACE_FOLLOWUP_EMAIL) ? process.env.TEST_AND_TRACE_FOLLOWUP_TEMPLATE_EMAIL : ""
          let response = await govNotifyGateway.sendEmail(templateId, queryParams.email)
          return response;
        } catch (error) {
          console.log(`Send email usecase error: ${error}`)
          return error
        }
      }

      if(pathSegments[0] == "previewTemplate"){
        try {
          if((queryParams.templateType == TEST_AND_TRACE_FOLLOWUP_TEXT)){

            let templateId =  process.env.TEST_AND_TRACE_FOLLOWUP_TEMPLATE_TEXT
  
            const response = await govNotifyGateway.getTemplatePreview(templateId)
            return response;
  
          }else if(queryParams.templateType == TEST_AND_TRACE_FOLLOWUP_EMAIL){
  
            let templateId = process.env.TEST_AND_TRACE_FOLLOWUP_TEMPLATE_EMAIL
            const response = await govNotifyGateway.getTemplatePreview(templateId)
            return response;
  
          } else if (queryParams.templateType == PRE_CALL_MESSAGE_TEMPLATE){
            let templateId = process.env.PRE_CALL_MESSAGE_TEMPLATE
            const response = await govNotifyGateway.getTemplatePreview(templateId, {name:"(first name)"})
            return response;
          }
        } catch (error) {
          console.log(`Get template usecase error: ${error}`)
          return error
        }
      
    }
  }
}
