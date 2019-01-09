import { GraphQLServer } from "graphql-yoga";
import Query from "./resolvers/Query";
const { PORT = 3000 } = process.env;

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers: {
    Query
  }
});

const options = {
  port: PORT,
  endpoint: "/",
  playground: "/"
};

server.start(options, ({ port }) =>
  console.log(
    `Server started, onward and upward on port: ${port}. Access the schema API at /`
  )
);
