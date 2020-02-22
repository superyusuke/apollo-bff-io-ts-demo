import { ApolloServer } from "apollo-server";
import { typeDefs } from "src/typeDefs";
import { resolvers } from "src/resolvers";

export const createApolloServer = () => {
  return new ApolloServer({
    typeDefs,
    resolvers
  });
};

const server = createApolloServer();

if (process.env.NODE_ENV !== "test") {
  server.listen({ port: 8080 }).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
}

export default server;
