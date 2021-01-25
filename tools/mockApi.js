const { dataGenerator } = require('./createMockData');
const jsonServer = require('json-server');

const server = jsonServer.create();
const middlewares = jsonServer.defaults({
    // Display json-server's built in homepage when json-server starts.
    static: 'node_modules/json-server/public'
});
const inMemDb = dataGenerator();
const router = jsonServer.router(inMemDb);

server.use(
    jsonServer.rewriter({
        '/api/v4/*': '/$1',
        '/resident/*': '/residents/$1',
        '/residents/:ResidentId': '/residents/:ResidentId?_embed=CaseNotes',
        '/residents/:ResidentId/helpRequests/:HelpRequestId': '/helpRequests/:HelpRequestId',
        '/residents/:ResidentId/helpRequests':
            '/residents/:ResidentId/helpRequests?_embed=help_request_calls',
        '/search/resident?*': '/residents?$1',
        '/residents/:ResidentId/helpRequests/:HelpRequestId/calls*':
            '/helpRequests/$2/help_request_calls$3'
    })
);

server.use(jsonServer.bodyParser);

server.use(function (req, res, next) {
    if (req.method !== 'GET') {
        const reqJson = JSON.stringify(req.body);
        req.body = JSON.parse(reqJson.replace(/_id(?=\":)/g, 'Id'));
    }
    next();
});

function getFilteredHelpRequestsWithHelpRequestCalls(req, respData) {
    const url = req.originalUrl;
    const isGET = req.method === 'GET';
    const urlPattern = /^\/residents?\/\d+\/helpRequests\?_embed=help_request_calls$/i;
    const urlMatches = url.match(urlPattern) !== null;
    //If endpoint call matches, add case notes before returning response back
    if (isGET && urlMatches) {
        for (let i = 0; i < respData.length; i++) {
            const hreqId = respData[i].id;
            const assocCalls = inMemDb.HelpRequestCalls.filter(
                (hrc) => hrc.HelpRequestId == hreqId
            );
            respData[i].HelpRequestCalls = assocCalls;
            respData[i].help_request_calls = undefined;
        }
    }
    respData = JSON.parse(
        JSON.stringify(respData)
            // .replace(/"ResidentId"/g, '"ResidentId"')
            .replace(/"id"/g, '"Id"')
    );
    return respData;
}

const returnOnlyCreatedObjectsIdForPOSTRequests = (req, respData) =>
    req.method === 'POST' ? { Id: respData.Id } : respData;

router.render = (req, res) => {
    // Add different foreign key name format support
    let response = JSON.parse(
        JSON.stringify(res.locals.data)
            // .replace(/"ResidentId"/g, '"ResidentId"')
            .replace(/"Id"/g, '"id"')
        //.replace(/(?<![\s\,\{\"])Id(?=\":)/g, '_id')
    );
    // Json-Server doesn't have nesting support filtered objects, hence this
    response = getFilteredHelpRequestsWithHelpRequestCalls(req, response);
    // Override the POST responses to return only Id as specified
    response = returnOnlyCreatedObjectsIdForPOSTRequests(req, response);

    res.jsonp(
        JSON.parse(
            JSON.stringify(response ? response : {})
                // .replace(/"ResidentId"/g, '"ResidentId"')
                .replace(/"id"/g, '"Id"')
        )
    );
};

server.use(middlewares);

function validateObjectProperties(obj, respBody) {
    for (prop in respBody) if (!obj.hasOwnProperty(prop)) return false;
    return true;
}

server.patch('/api/v3/help-requests/:helpRequestId', function (req, res) {
    const bodyObj = { ...req.body }; //add try parse json
    const helpRequestId = req.params.helpRequestId;
    const helpRequest = inMemDb.helpRequests.find((hr) => hr.id == helpRequestId);
    if (helpRequest !== undefined) {
        const isValid = validateObjectProperties(helpRequest, bodyObj);
        if (isValid) {
            for (prop in bodyObj) helpRequest[prop] = bodyObj[prop];
            res.status(204).jsonp();
        } else {
            res.status(400).jsonp(`Help request does not have property '${prop}'.`);
        }
    } else {
        res.status(404).jsonp(`Help request with 'Id' of ${helpRequestId} was not found.`);
    }
});

// Mitigating a bug within Json-Server, where foreign key id of nested entity
// is saved as string it's required to keep to the specification that says
// that the resident_id should be taken from url
server.post('/residents/:ResidentId/helpRequests/', function (req, res, next) {
    req.url = '/helpRequests';
    const ResidentId = parseInt(req.params.ResidentId);
    req.params = {};
    req.body['ResidentId'] = ResidentId;
    next();
});

server.post('/residents/:ResidentId/helpRequests/:HelpRequestId/calls', function (req, res, next) {
    req.url = '/help_request_calls';
    const HelpRequestId = parseInt(req.params.ResidentId);
    req.params = {};
    req.body['HelpRequestId'] = HelpRequestId;
    next();
});

const isCallbackPredicate = (callbackRequired, InitialCallbackCompleted) =>
    callbackRequired == true ||
    callbackRequired == null ||
    (InitialCallbackCompleted == false && callbackRequired == false);

// Is the following check correct?
const unsuccessfulCalls = (collection) =>
    collection.filter((c) => /refused_to_engage|wrong_number/.test(c.CallOutcome)).length;

// because the url asks for param to be CallType, when in the db it's called HelpNeeded
const replaceObjectKey = (obj, currentKey, newKey) => {
    obj[newKey] = obj[currentKey];
    delete obj[currentKey];
};

// This is the ideal one, but for now we have to reuse the bad one
server.get('/callbackList', function (req, res) {
    const queryObj = req.query;
    let helpRequests = inMemDb.helpRequests; // starting point

    if (queryObj.hasOwnProperty('CallType')) replaceObjectKey(queryObj, 'CallType', 'HelpNeeded');

    for (param in queryObj)
        helpRequests = helpRequests.filter((helpRequest) => helpRequest[param] == queryObj[param]);
    // == instead of === for potential fields that contain numbers - allows avoid parsing

    helpRequests = helpRequests.filter((hr) =>
        isCallbackPredicate(hr.CallbackRequired, hr.InitialCallbackCompleted)
    );

    helpRequests = helpRequests.map((helpRequest) => {
        const resident = inMemDb.residents.find((r) => r.id == helpRequest.ResidentId);
        const calls = inMemDb.HelpRequestCalls.filter((hrc) => hrc.HelpRequestId == helpRequest.id);
        const real_callback = {
            ResidentName: [resident.FirstName, resident.LastName].join(' '),
            ResidentId: resident.id,
            HelpRequestId: helpRequest.id,
            Address: [
                resident.AddressFirstLine,
                resident.AddressSecondLine,
                resident.AddressThirdLine
            ].join(', '),
            RequestedDate: helpRequest.RequestedDate, // where does this info is supposed to come from?!!! Need to add field to db schema? For now dropped it under a HelpRequest
            Type: helpRequest.HelpNeeded,
            UnsuccessfulCallAttempts: unsuccessfulCalls(calls),
            FollowUpRequired: helpRequest.CallbackRequired, // Is this correct assumption?
            AssignedTo: helpRequest.AssignedTo,
            RescheduledAt: helpRequest.RescheduledAt // Need to think about this one!!! Where is it stored? How do we set it on front-end? For now I'll drop it into under a help request
        };
        return real_callback;
    });
    res.jsonp(
        helpRequests.sort(function (a, b) {
            return new Date(b.RequestedDate) - new Date(a.RequestedDate);
        })
    );
});

// the bad callbacks endpoint
server.get('/api/v3/help-requests/callbacks', function (req, res) {
    let helpRequests = inMemDb.helpRequests; // starting point

    // we're simply dumping everything we got regardless of the usefulness,
    // just like in the current API - so no need for filtering

    helpRequests = helpRequests.map((helpRequest) => {
        const resident = inMemDb.residents.find((r) => r.id == helpRequest.ResidentId);
        const calls = inMemDb.HelpRequestCalls.filter((hrc) => hrc.HelpRequestId == helpRequest.id);
        const caseNotes = inMemDb.CaseNotes.filter((cn) => cn.HelpRequestId == helpRequest.id);
        const bad_callback = {
            Id: helpRequest.Id,
            ResidentId: helpRequest.ResidentId,
            IsOnBehalf: helpRequest.IsOnBehalf,
            ConsentToCompleteOnBehalf: helpRequest.ConsentToCompleteOnBehalf,
            OnBehalfFirstName: helpRequest.OnBehalfFirstName,
            OnBehalfLastName: helpRequest.OnBehalfLastName,
            OnBehalfEmailAddress: helpRequest.OnBehalfEmailAddress,
            OnBehalfContactNumber: helpRequest.OnBehalfContactNumber,
            RelationshipWithResident: helpRequest.RelationshipWithResident,
            PostCode: resident.PostCode,
            Uprn: resident.Uprn,
            Ward: resident.Ward,
            AddressFirstLine: resident.AddressFirstLine,
            AddressSecondLine: resident.AddressSecondLine,
            AddressThirdLine: resident.AddressThirdLine,
            GettingInTouchReason: helpRequest.GettingInTouchReason,
            HelpWithAccessingFood: helpRequest.HelpWithAccessingFood,
            HelpWithAccessingSupermarketFood: helpRequest.HelpWithAccessingSupermarketFood,
            HelpWithCompletingNssForm: helpRequest.HelpWithCompletingNssForm,
            HelpWithShieldingGuidance: helpRequest.HelpWithShieldingGuidance,
            HelpWithNoNeedsIdentified: helpRequest.HelpWithNoNeedsIdentified,
            HelpWithAccessingMedicine: helpRequest.HelpWithAccessingMedicine,
            HelpWithAccessingOtherEssentials: helpRequest.HelpWithAccessingOtherEssentials,
            HelpWithDebtAndMoney: helpRequest.HelpWithDebtAndMoney,
            HelpWithHealth: helpRequest.HelpWithHealth,
            HelpWithMentalHealth: helpRequest.HelpWithMentalHealth,
            HelpWithAccessingInternet: helpRequest.HelpWithAccessingInternet,
            HelpWithHousing: helpRequest.HelpWithHousing,
            HelpWithJobsOrTraining: helpRequest.HelpWithJobsOrTraining,
            HelpWithChildrenAndSchools: helpRequest.HelpWithChildrenAndSchools,
            HelpWithDisabilities: helpRequest.HelpWithDisabilities,
            HelpWithSomethingElse: helpRequest.HelpWithSomethingElse,
            MedicineDeliveryHelpNeeded: helpRequest.MedicineDeliveryHelpNeeded,
            IsPharmacistAbleToDeliver: resident.IsPharmacistAbleToDeliver,
            WhenIsMedicinesDelivered: helpRequest.WhenIsMedicinesDelivered,
            NameAddressPharmacist: resident.NameAddressPharmacist,
            UrgentEssentials: helpRequest.UrgentEssentials,
            UrgentEssentialsAnythingElse: helpRequest.UrgentEssentialsAnythingElse,
            CurrentSupport: helpRequest.CurrentSupport,
            CurrentSupportFeedback: helpRequest.CurrentSupportFeedback,
            FirstName: resident.FirstName,
            LastName: resident.LastName,
            DobMonth: resident.DateOfBirth.getMonth(), //.split('-')[0],
            DobYear: resident.DateOfBirth.getFullYear(), //.split('-')[1],
            DobDay: resident.DateOfBirth.getDay(), //.split('-')[2],
            ContactTelephoneNumber: resident.ContactTelephoneNumber,
            ContactMobileNumber: resident.ContactMobileNumber,
            EmailAddress: resident.EmailAddress,
            GpSurgeryDetails: resident.GpSurgeryDetails,
            NumberOfChildrenUnder18: resident.NumberOfChildrenUnder18,
            ConsentToShare: resident.ConsentToShare,
            DateTimeRecorded: helpRequest.RequestedDate,
            RecordStatus: helpRequest.RecordStatus,
            InitialCallbackCompleted: helpRequest.InitialCallbackCompleted,
            CallbackRequired: helpRequest.CallbackRequired,
            CaseNotes: caseNotes.join('---'),
            AdviceNotes: 'string',
            HelpNeeded: helpRequest.HelpNeeded,
            NhsNumber: 'string',
            NhsCtasId: 'string',
            AssignedTo: helpRequest.AssignedTo,
            RescheduledAt: helpRequest.RescheduledAt,
            HelpRequestCalls: calls
        };
        return bad_callback;
    });
    res.jsonp(
        helpRequests.sort(function (a, b) {
            return new Date(b.RequestedDate) - new Date(a.RequestedDate);
        })
    );
});

server.post('/residents/:residentId', function (req, res, next) {
    req.params = {};
    req.body['help_requestId'] = help_requestId;
    next();
});

server.get('/residents', (req, res) => {
    const queryObj = req.query;
    console.log('Finding  resident with postcode: ', queryObj.Postcode);
    console.log('Finding  resident with First name: ', queryObj.LastName);
    console.log('Finding  resident with postcode: ', queryObj.LastName);
    let residents = inMemDb.residents;

    if (queryObj.Postcode) {
        residents = residents.filter(
            (resident) => resident.PostCode.replace(/ /g, '') == queryObj.Postcode
        );
    }
    if (queryObj.LastName) {
        residents = residents.filter((resident) => resident.LastName == queryObj.LastName);
    }
    if (queryObj.FirstName) {
        residents = residents.filter((resident) => resident.FirstName == queryObj.FirstName);
    }
    if (
        !queryObj.Postcode &&
        !queryObj.LastName &&
        !queryObj.FirstName &&
        req.url != '/residents'
    ) {
        residents = [];
    }

    const result = JSON.parse(JSON.stringify(residents).replace(/"id"/g, '"Id"'));
    res.status(200).send(result);
});

server.use(router);

server.listen(3001, () => {
    console.log('\x1b[33m', 'JSON Server is running', '\x1b[0m');
    console.log('Visit a Mock-API home page at \x1b[34m http://localhost:3001 \x1b[0m');
});
