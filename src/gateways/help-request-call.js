import { DefaultGateway } from '../gateways/default-gateway';

const ToPostHelpRequestCall = (hr) => {
  const callType = (hr.callType == 'CEV') ? 'Shielding': hr.callType
  return JSON.stringify({
      CallType: callType,
			CallDirection: hr.callDirection,
			CallOutcome: hr.callOutcomeValues,
			CallDateTime: hr.callDateTime,
			CallHandler: hr.callHandler
  })
}
export class HelpRequestCallGateway extends DefaultGateway {
    async postHelpRequestCall(helpRequestId, requestBody) {
      return await this.postToUrl(`v3/help-requests/${helpRequestId}/calls`, ToPostHelpRequestCall(requestBody))
    }
}
