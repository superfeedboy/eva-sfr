import * as path from "node:path";
import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeTypeDefs } from "@graphql-tools/merge";

console.log(__dirname);

const typesArray = loadFilesSync(__dirname, {
	extensions: ["gql"],
});

const typeDefs = mergeTypeDefs(typesArray);

export { typeDefs };
