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

router.render = (req, res) => {
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
