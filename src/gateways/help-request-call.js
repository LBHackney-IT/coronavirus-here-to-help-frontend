import { DefaultGateway } from '../gateways/default-gateway';
import {CEV, SHIELDING} from '../helpers/constants';

const ToPostHelpRequestCall = (hr) => {
  return JSON.stringify({
      CallType: (hr.callType == CEV) ? SHIELDING: hr.callType,
			CallDirection: hr.callDirection,
			CallOutcome: hr.callOutcome,
			CallDateTime: hr.callDateTime,
			CallHandler: hr.callHandler
  })
}
export class HelpRequestCallGateway extends DefaultGateway {
    async postHelpRequestCall(helpRequestId, requestBody) {
      return await this.postToUrl(`v3/help-requests/${helpRequestId}/calls`, ToPostHelpRequestCall(requestBody))
    }
}
