import {createServer} from 'node:http'
import {createYoga} from 'graphql-yoga'
import {writeFileSync} from "fs";
import {lexicographicSortSchema, printSchema} from "graphql/utilities";
import {graphqlBuilder} from "./graphql/builder";
import {graphqlContext} from "./graphql/context";

const graphqlSchema = graphqlBuilder.toSchema();
const schemaAsString = printSchema(lexicographicSortSchema(graphqlSchema));
writeFileSync('./schema.graphql', schemaAsString);

console.log(`Starting graphql`);
const yoga = createYoga({
	cors: true,
	graphiql: true,
	schema: graphqlSchema,
	context: graphqlContext,
});
const server = createServer(yoga);

server.listen(4444, () => {
	console.info('Server is running on http://localhost:4444/graphql');
});
