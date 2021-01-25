import { DefaultGateway } from '../gateways/default-gateway';

const ToHelpRequest = (hr) => {
    return {
        id: hr.Id,
        residentId: hr.ResidentId,
        assignedTo: hr.AssignedTo,
        adviceNotes: hr.AdviceNotes,
        callbackRequired: hr.CallbackRequired,
        currentSupport: hr.CurrentSupport,
        currentSupportFeedback: hr.CurrentSupportFeedback,
        dateTimeRecorded: hr.DateTimeRecorded,
        gettingInTouchReason: hr.GettingInTouchReason,
        helpNeeded: hr.HelpNeeded,
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
        requestedDate: hr.RequestedDate
    };
};

export class HelpRequestGateway extends DefaultGateway {
    async getHelpRequest(residentId, requestId) {
        const response = await this.getFromUrl(`resident/${residentId}/helpRequests/${requestId}`);
        const helpRequest = ToHelpRequest(response);
        return helpRequest;
    }
    async putHelpRequest(residentId, requestId, request_body) {
        const response = await this.putToUrl(
            `resident/${residentId}/helpRequests/${requestId}`,
            request_body
        );
        const helpRequest = ToHelpRequest(response);
        return helpRequest;
    }

    async patchHelpRequest(helpRequestId, requestBody) {
        return await this.patchToUrl(`api/v3/help-requests/${helpRequestId}`, requestBody);
    }

    async postHelpRequest(residentId, requestBody) {
      return await this.postToUrl(`resident/${residentId}/helpRequest`, requestBody)
    }
}
