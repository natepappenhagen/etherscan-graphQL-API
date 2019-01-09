"use strict";

var _graphqlYoga = require("graphql-yoga");

var _Query = require("./resolvers/Query");

var _Query2 = _interopRequireDefault(_Query);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const { PORT = 3000 } = process.env;

const server = new _graphqlYoga.GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers: {
    Query: _Query2.default
  }
});

const options = {
  port: PORT,
  endpoint: "/",
  playground: "/"
};

server.start(options, ({ port }) => console.log(`Server started, onward and upward on port: ${port}. Access the schema API at /`));