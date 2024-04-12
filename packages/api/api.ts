import { syncDb } from "@api/db/sequelize";
import { resolvers } from "@api/resolvers";
import { typeDefs } from "@api/schemas";
import { ApolloServer } from "apollo-server";
import dotenv from "dotenv";

dotenv.config();
const server: ApolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  cors: {
    origin: "*",
    credentials: true,
  },
});
const port: number = Number.parseInt(process.env.API_PORT || "4000", 10);

server.listen({ port }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
  syncDb();
});
