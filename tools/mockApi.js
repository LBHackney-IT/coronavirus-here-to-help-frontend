const { dataGenerator } = require("./createMockData");
const jsonServer = require("json-server");
const randexp = require("randexp").randexp;
const faker = require("faker");

const server = jsonServer.create();
const middlewares = jsonServer.defaults({
  // Display json-server's built in homepage when json-server starts.
  static: "node_modules/json-server/public",
});
const inMemDb = dataGenerator();
const router = jsonServer.router(inMemDb);

server.use(
  jsonServer.rewriter({
    "/api/v4/*": "/$1",
    "/resident/*": "/residents/$1",
    "/residents/:residentId": "/residents/:residentId?_embed=case_notes",
    "/residents/:residentId/help_requests":
      "/residents/:residentId/help_requests?_embed=help_request_calls",
    "/search/resident?*": "/residents?$1",
    "/residents/:residentId/help_requests/:help_requestId/calls*":
      "/help_request_calls$3",
  })
);

server.use(jsonServer.bodyParser);

server.use(function (req, res, next) {
  if (req.method !== "GET") {
    const reqJson = JSON.stringify(req.body);
    req.body = JSON.parse(reqJson.replace(/_id(?=\":)/g, "Id"));
  }
  next();
});

function getFilteredHelpRequestsWithHelpRequestCalls(req, respData) {
  const url = req.originalUrl;
  const isGET = req.method === "GET";
  const urlPattern = /^\/residents?\/\d+\/help_requests\?_embed=help_request_calls$/i;
  const urlMatches = url.match(urlPattern) !== null;
  //If endpoint call matches, add case notes before returning response back
  if (isGET && urlMatches) {
    for (let i = 0; i < respData.length; i++) {
      const hreqId = respData[i].id;
      const assocCaseNotes = inMemDb.help_request_calls.filter(
        (hrc) => hrc.help_requestId == hreqId
      );
      respData[i].help_request_calls = assocCaseNotes;
    }
  }
  return respData;
}

const returnOnlyCreatedObjectsIdForPOSTRequests = (req, respData) =>
  req.method === "POST" ? respData.id : respData;

router.render = (req, res) => {
  // Add different foreign key name format support
  let response = JSON.parse(
    JSON.stringify(res.locals.data).replace(/(?<![\s\,\{\"])Id(?=\":)/g, "_id")
  );
  // Json-Server doesn't have nesting support filtered objects, hence this
  response = getFilteredHelpRequestsWithHelpRequestCalls(req, response);
  // Override the POST responses to return only Id as specified
  //response = returnOnlyCreatedObjectsIdForPOSTRequests(req, response);

  res.jsonp(response);
};

server.use(middlewares);

// Mitigating a bug within Json-Server, where foreign key id of nested entity
// is saved as string it's required to keep to the specification that says
// that the resident_id should be taken from url
server.post("/residents/:residentId/help_requests/", function (req, res, next) {
  req.url = "/help_requests";
  const residentId = parseInt(req.params.residentId);
  req.params = {};
  req.body["residentId"] = residentId;
  next();
});

server.post(
  "/residents/:residentId/help_requests/:help_requestId/calls",
  function (req, res, next) {
    req.url = "/help_request_calls";
    const help_requestId = parseInt(req.params.residentId);
    req.params = {};
    req.body["help_requestId"] = help_requestId;
    next();
  }
);

const isCallbackPredicate = (callbackRequired, InitialCallbackCompleted) =>
  callbackRequired == true ||
  callbackRequired == null ||
  (InitialCallbackCompleted == false && callbackRequired == false);

// Is the following check correct?
const unsuccessfulCalls = (collection) =>
  collection.filter((c) =>
    /refused_to_engage|wrong_number/.test(c.call_outcome)
  ).length;

// because the url asks for param to be call_type, when in the db it's called help_needed
const replaceObjectKey = (obj, currentKey, newKey) => {
  obj[newKey] = obj[currentKey];
  delete obj[currentKey];
};

server.get("/callback_list", function (req, res) {
  const queryObj = req.query;
  let helpRequests = inMemDb.help_requests; // starting point

  replaceObjectKey(queryObj, "call_type", "help_needed");

  for (param in queryObj)
    helpRequests = helpRequests.filter(
      (helpRequest) => helpRequest[param] == queryObj[param]
    );
  // == instead of === for potential fields that contain numbers - allows avoid parsing

  helpRequests = helpRequests.filter((hr) =>
    isCallbackPredicate(hr.callback_required, hr.initial_callback_completed)
  );

  helpRequests = helpRequests.map((helpRequest) => {
    const resident = inMemDb.residents.find(
      (r) => r.id == helpRequest.residentId
    );
    const calls = inMemDb.help_request_calls.filter(
      (hrc) => hrc.help_requestId == helpRequest.id
    );
    const real_callback = {
      resident_name: [resident.first_name, resident.last_name].join(" "),
      id: resident.id,
      address: [
        resident.address_first_line,
        resident.address_second_line,
        resident.address_third_line,
      ].join(", "),
      requested_date: faker.date.soon(7), // where does this info is supposed to come from?!!! Need to add field to db schema?
      type: helpRequest.help_needed,
      unsuccessful_call_attempts: unsuccessfulCalls(calls),
      follow_up_required: helpRequest.callback_required, // Is this correct assumption?
      assigned_to: helpRequest.assigned_to,
      rescheduled_at: randexp(/(0\d)|(1\d)|(2[0-3])[0-5]\d/), // Need to think about this one!!! Where is it stored? How do we set it on front-end?
    };
    return real_callback;
  });
  res.jsonp(helpRequests);
});

server.use(router);

server.listen(3001, () => {
  console.log("\x1b[33m", "JSON Server is running", "\x1b[0m");
  console.log(
    "Visit a Mock-API home page at \x1b[34m http://localhost:3001 \x1b[0m"
  );
});
