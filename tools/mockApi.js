const { dataGenerator } = require("./createMockData");
const jsonServer = require("json-server");

const server = jsonServer.create();
const middlewares = jsonServer.defaults({
  // Display json-server's built in homepage when json-server starts.
  static: "node_modules/json-server/public",
});
const inMemDb = dataGenerator(10);
const router = jsonServer.router(inMemDb);

server.use(middlewares);
server.use(router);

server.listen(3001, () => {
  console.log("JSON Server is running");
});
