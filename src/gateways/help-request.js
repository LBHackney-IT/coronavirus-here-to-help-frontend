import { DefaultGateway } from '../gateways/default-gateway';
import { CEV, SHIELDING } from '../helpers/constants';
import {
    isJSON,
    getDate,
    getNote,
    getAuthor,
    formatDate,
    getNonJsonCasenotesArray
} from '../helpers/case_notes_helper';

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
        helpNeededSubtype: hr.HelpNeededSubtype,
        helpWithAccessingFood: hr.HelpWithAccessingFood,
        helpWithAccessingSupermarketFood: hr.HelpWithAccessingSupermarketFood,
        helpWithCompletingNssForm: hr.HelpWithCompletingNssForm,
        helpWithShieldingGuidance: hr.HelpWithShieldingGuidance,
        helpWithAccessingOtherEssentials: hr.HelpWithAccessingOtherEssentials,
        helpWithNoNeedsIdentified: hr.HelpWithNoNeedsIdentified,
        helpWithAccessingInternet: hr.HelpWithAccessingInternet,
        helpWithAccessingMedicine: hr.HelpWithAccessingMedicine,
        hedicineDeliveryHelpNeeded: hr.MedicineDeliveryHelpNeeded,
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
        nhsCtasId: hr.NhsCtasId,
        metadata: hr.Metadata ? JSON.parse(hr.Metadata) : {},
        urgentEssentials: hr.UrgentEssentials,
        urgentEssentialsAnythingElse: hr.UrgentEssentialsAnythingElse,
        whenIsMedicinesDelivered: hr.WhenIsMedicinesDelivered,
        rescheduledAt: hr.RescheduledAt,
        requestedDate: hr.RequestedDate,
        helpRequestCalls: ToCalls(hr.HelpRequestCalls),
        upcomingCallOutcome: ToUpcomingAction(
            hr.HelpRequestCalls,
            hr.CallbackRequired,
            hr.InitialCallbackCompleted
        ),
        totalCompletedCalls: ToTotalCompletedCalls(hr.HelpRequestCalls),
        caseNotes: ToStandardisiedCaseNotesArray(
            hr.CaseNotes,
            hr.HelpNeeded == SHIELDING ? CEV : hr.HelpNeeded
        )
    };
};
const ToStandardisiedCaseNotesArray = (caseNotes, helpNeeded) => {
    if (!caseNotes) return [];
    let standardisiedCaseNotesArray = [];
    if (isJSON(caseNotes)) {
        let caseNoteObject = JSON.parse(caseNotes);
        if (caseNoteObject.length > 0) {
            caseNoteObject.forEach((note) => {
                note.formattedDate = formatDate(note.noteDate);
                note.helpNeeded = helpNeeded;
                standardisiedCaseNotesArray.push(note);
            });
        }
    } else if (!isJSON(caseNotes)) {
        let nonJsonCaseNotesArray = getNonJsonCasenotesArray(caseNotes);
        nonJsonCaseNotesArray.forEach((nonJsonCaseNote) => {
            if (nonJsonCaseNote) {
                let caseNoteObject = {
                    author: getAuthor(nonJsonCaseNote),
                    formattedDate: formatDate(getDate(nonJsonCaseNote)),
                    note: getNote(nonJsonCaseNote),
                    helpNeeded: helpNeeded,
                    noteDate: getDate(nonJsonCaseNote)
                };
                standardisiedCaseNotesArray.push(caseNoteObject);
            }
        });
    }
    return standardisiedCaseNotesArray;
};

const ToUpcomingAction = (helpRequestCalls, callbackRequired, initialCallbackCompleted) => {
    if (callbackRequired == false && initialCallbackCompleted == true) return '';

    if (helpRequestCalls.length == 0) return 'Call required';

    if (helpRequestCalls.pop()?.CallOutcome?.includes('call_rescheduled'))
        return 'Call rescheduled';

    return 'Follow-up required';
};

const ToTotalCompletedCalls = (helpRequestCalls) => {
    let totalCompletedCalls = 0;
    if (helpRequestCalls.length > 0) {
        helpRequestCalls.forEach((call) => {
            if (call.CallOutcome?.includes('callback_complete')) {
                console.log(call);
                totalCompletedCalls += 1;
            }
        });
    }
    return totalCompletedCalls;
};

const ToCalls = (calls) => {
    return calls?.map((call) => {
        return {
            id: call.Id,
            helpRequestId: call.HelpRequestId,
            callType: call.CallType,
            callDirection: call.CallDirection,
            callOutcome: call.CallOutcome,
            callDateTime: call.CallDateTime,
            callHandler: call.CallHandler
        };
    });
};

const ToPostHelpRequestBody = (hr) => {
    return JSON.stringify({
        ResidentId: hr.residentId,
        CallbackRequired: hr.callbackRequired,
        InitialCallbackCompleted: hr.initialCallbackCompleted,
        DateTimeRecorded: hr.dateTimeRecorded,
        HelpNeeded: hr.helpNeeded == CEV ? SHIELDING : hr.helpNeeded,
        HelpNeededSubtype: hr.helpNeededSubtype,
        HelpWithAccessingFood: hr.helpWithAccessingFood,
        HelpWithAccessingSupermarketFood: hr.helpWithAccessingSupermarketFood,
        HelpWithCompletingNssForm: hr.helpWithCompletingNssForm,
        HelpWithShieldingGuidance: hr.helpWithShieldingGuidance,
        HelpWithAccessingOtherEssentials: hr.helpWithAccessingOtherEssentials,
        HelpWithNoNeedsIdentified: hr.helpWithNoNeedsIdentified
    });
};

const ToPatchHelpRequestObject = (hr) => {
    let object = {
        ResidentId: hr.residentId,
        CallbackRequired: hr.callbackRequired,
        InitialCallbackCompleted: hr.initialCallbackCompleted,
        DateTimeRecorded: hr.dateTimeRecorded,
        HelpNeeded: hr.helpNeeded == CEV ? SHIELDING : hr.helpNeeded,
        AssignedTo: hr.assignedTo,
        HelpWithAccessingFood: hr.helpWithAccessingFood,
        HelpWithAccessingSupermarketFood: hr.helpWithAccessingSupermarketFood,
        HelpWithCompletingNssForm: hr.helpWithCompletingNssForm,
        HelpWithShieldingGuidance: hr.helpWithShieldingGuidance,
        HelpWithAccessingOtherEssentials: hr.helpWithAccessingOtherEssentials,
        HelpWithNoNeedsIdentified: hr.helpWithNoNeedsIdentified
    };

    Object.keys(object).forEach((key) => object[key] == null && delete object[key]);

    return JSON.stringify(object);
};

export class HelpRequestGateway extends DefaultGateway {
    async getHelpRequest(residentId, requestId) {
        const response = await this.getFromUrl(
            `v4/residents/${residentId}/help-requests/${requestId}`
        );
        const helpRequest = ToHelpRequestDomain(response);
        return helpRequest;
    }

    async getHelpRequests(residentId) {
        const response = await this.getFromUrl(`v4/residents/${residentId}/help-requests`);
        console.log('helpRequestResponse', response);
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
        return await this.patchToUrl(
            `v3/help-requests/${helpRequestId}`,
            ToPatchHelpRequestObject(requestBody)
        );
    }

    async postHelpRequest(residentId, requestBody) {
        return await this.postToUrl(
            `v4/residents/${residentId}/help-requests`,
            ToPostHelpRequestBody(requestBody)
        );
    }
}
