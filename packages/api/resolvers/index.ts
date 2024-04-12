import { GraphQLDateTime } from "graphql-iso-date";
import { merge } from "lodash";
import { resolvers as gameResolvers } from "./Game";
import { resolvers as mapResolvers } from "./Map";
import { resolvers as playerResolvers } from "./Player";
import { resolvers as scoreResolvers } from "./Score";
import { resolvers as seasonResolvers } from "./Season";

export const resolvers = merge(
	{ DateTime: GraphQLDateTime },
	playerResolvers,
	gameResolvers,
	seasonResolvers,
	scoreResolvers,
	mapResolvers,
);
