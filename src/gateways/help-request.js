import { DefaultGateway } from '../gateways/default-gateway';
import {CEV, SHIELDING} from '../helpers/constants';

const ToHelpRequestDomain = (hr) => {
    return {
        id: hr.Id,
        residentId: hr.ResidentId,
        assignedTo: hr.AssignedTo,
        adviceNotes: hr.AdviceNotes,
        callbackRequired: hr.CallbackRequired,
        currentSupport: hr.CurrentSupport,
        currentSupportFeedback: hr.CurrentSupportFeedback,
        postCode: hr.Postcode,
        dateTimeRecorded: hr.DateTimeRecorded,
        gettingInTouchReason: hr.GettingInTouchReason,
        helpNeeded: (hr.HelpNeeded == SHIELDING)? CEV : hr.HelpNeeded,
        helpWithAccessingFood: hr.HelpWithAccessingFood,
        helpWithAccessingInternet: hr.HelpWithAccessingInternet,
        helpWithAccessingMedicine: hr.HelpWithAccessingMedicine,
        hedicineDeliveryHelpNeeded: hr.MedicineDeliveryHelpNeeded,
        helpWithAccessingOtherEssentials: hr.HelpWithAccessingOtherEssentials,
        helpWithChildrenAndSchools: hr.HelpWithChildrenAndSchools,
        helpWithDebtAndMoney: hr.HelpWithDebtAndMoney,
        helpWithDisabilities: hr.HelpWithDisabilities,
        helpWithHealth: hr.HelpWithHealth,
        helpWithHousing: hr.HelpWithHousing,
        helpWithJobsOrTraining: hr.HelpWithJobsOrTraining,
        helpWithMentalHealth: hr.HelpWithMentalHealth,
        helpWithSomethingElse: hr.HelpWithSomethingElse,
        initialCallbackCompleted: hr.InitialCallbackCompleted,
        isOnBehalf: hr.IsOnBehalf,
        consentToCompleteOnBehalf: hr.ConsentToCompleteOnBehalf,
        onBehalfFirstName: hr.OnBehalfFirstName,
        onBehalfLastName: hr.OnBehalfLastName,
        onBehalfEmailAddress: hr.OnBehalfEmailAddress,
        onBehalfContactNumber: hr.OnBehalfContactNumber,
        recordStatus: hr.RecordStatus,
        relationshipWithResident: hr.RelationshipWithResident,
        urgentEssentials: hr.UrgentEssentials,
        urgentEssentialsAnythingElse: hr.UrgentEssentialsAnythingElse,
        whenIsMedicinesDelivered: hr.WhenIsMedicinesDelivered,
        rescheduledAt: hr.RescheduledAt,
        requestedDate: hr.RequestedDate,
        helpRequestCalls: ToCalls(hr.HelpRequestCalls),
    };
};



const ToCalls = (calls) => {
    return calls?.map((call) => {
        return {
            id: call.Id,
            helpRequestId: call.HelpRequestId,
            callType: call.CallType,
            callDirection: call.CallDirection,
            callOutcome: call.CallOutcome,
            callDateTime: call.CallDateTime
        };
    });
};

const ToPostHelpRequestBody = (hr) => {
    return JSON.stringify({
        ResidentId: hr.residentId,
        CallbackRequired: hr.callbackRequired,
        InitialCallbackCompleted: hr.initialCallbackCompleted,
        DateTimeRecorded: hr.dateTimeRecorded,
        HelpNeeded: (hr.helpNeeded == CEV)? SHIELDING : hr.helpNeeded
    });
};

const ToPatchHelpRequestObject = (hr) => {
    let object = {
        ResidentId: hr.residentId,
        CallbackRequired: hr.callbackRequired,
        InitialCallbackCompleted: hr.initialCallbackCompleted,
        DateTimeRecorded: hr.dateTimeRecorded,
        HelpNeeded: (hr.helpNeeded == CEV)? SHIELDING : hr.helpNeeded,
        AssignedTo: hr.assignedTo
    };

    Object.keys(object).forEach((key) => (object[key] == null) && delete object[key]);

    return JSON.stringify(object)
}

export class HelpRequestGateway extends DefaultGateway {
    async getHelpRequest(residentId, requestId) {
        const response = await this.getFromUrl(`v4/residents/${residentId}/help-requests/${requestId}`); //`resident/${residentId}/helpRequests/${requestId}`); will we stick with this url later on?
        const helpRequest = ToHelpRequestDomain(response);
        return helpRequest;
    }

    async getHelpRequests(residentId) {
        const response = await this.getFromUrl(`v4/residents/${residentId}/help-requests`);
        const helpRequests = response.map(ToHelpRequestDomain);
        return helpRequests;
    }

    async putHelpRequest(residentId, requestId, request_body) {
        const response = await this.putToUrl(
            `v4/residents/${residentId}/help-requests/${requestId}`,
            request_body
        );
        const helpRequest = ToHelpRequestDomain(response);
        return helpRequest;
    }

    async patchHelpRequest(helpRequestId, requestBody) {
        return await this.patchToUrl(`v3/help-requests/${helpRequestId}`, ToPatchHelpRequestObject(requestBody));
    }

    async postHelpRequest(residentId, requestBody) {
        const response = await this.postToUrl(`v4/residents/${residentId}/help-requests`, ToPostHelpRequestBody(requestBody))
        const helpRequest = ToHelpRequestDomain(response);
        return helpRequest;
    }
}
