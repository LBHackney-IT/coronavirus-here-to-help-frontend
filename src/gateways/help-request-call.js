import { DefaultGateway } from '../gateways/default-gateway';

const ToPstHelpRequestCallObject = (hr) =>{
  const callType = (hr.callType == 'CEV')? 'Sheilding' : hr.callType
  return JSON.stringify({
    CallType: callType,
    CallDirection: hr.callDirection,
    CallOutcome: hr.callOutcome,
    CallDateTime: hr.callDateTime,
    CallHandler: hr.callHandler
  })
}

export class HelpRequestCallGateway extends DefaultGateway {
    async postHelpRequestCall(helpRequestId, requestBody) {
      return await this.postToUrl(`v3/help-requests/${helpRequestId}/calls`, ToPstHelpRequestCallObject(requestBody))
    }
}
