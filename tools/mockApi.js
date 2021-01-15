const { dataGenerator } = require("./createMockData");
const jsonServer = require("json-server");

const server = jsonServer.create();
const middlewares = jsonServer.defaults({
  // Display json-server's built in homepage when json-server starts.
  static: "node_modules/json-server/public",
});
const inMemDb = dataGenerator(10);
const router = jsonServer.router(inMemDb);

server.use(jsonServer.bodyParser);

server.use(function (req, res, next) {
  if (req.method !== "GET") {
    const reqJson = JSON.stringify(req.body);
    req.body = JSON.parse(reqJson.replace(/_id(?=\":)/g, "Id"));
  }
  next();
});

function getFilteredHelpRequestsWithCaseNotes(req, res) {
  const url = req.originalUrl;
  const isGET = req.method === "GET";
  const urlPattern = /^\/residents?\/\d+\/help_requests\?_embed=case_notes$/i;
  const urlMatches = url.match(urlPattern) !== null;

  //If endpoint call matches, add case notes before returning response back
  if (isGET && urlMatches) {
    for (let i = 0; i < res.length; i++) {
      const hreqId = res[i].id;
      const assocCaseNotes = inMemDb.case_notes.filter(
        (cn) => cn.help_requestId == hreqId
      );
      res[i].case_notes = assocCaseNotes;
    }
  }
  return res;
}

router.render = (req, res) => {
  // Json-Server doesn't have nesting support filtered objects, hence this
  response = getFilteredHelpRequestsWithCaseNotes(req, res.locals.data);

  response = JSON.stringify(res.locals.data).replace(
    /(?<![\s\,\{\"])[Ii]d(?=\":)/g,
    "_id"
  );

  res.jsonp(JSON.parse(response));
};

server.use(middlewares);
server.use(router);

server.listen(3001, () => {
  console.log("JSON Server is running");
});
