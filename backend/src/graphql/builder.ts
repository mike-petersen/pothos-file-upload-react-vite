import SchemaBuilder from "@pothos/core";
import ScopeAuthPlugin from "@pothos/plugin-scope-auth";
import ValidationPlugin from "@pothos/plugin-validation";
import {GraphQLError} from "graphql/error";
import {JwtPayload} from "jsonwebtoken";
import { Dictionary } from "models/Dictionary";

export type GraphqlAdditionalContext = {
	User?: JwtPayload;
};

export const graphqlBuilder = new SchemaBuilder<{
	AuthScopes: {
		protected: boolean;
		public: boolean;
	};
	Context: GraphqlAdditionalContext;
	Scalars: {
		Dictionary: {
			Input: Dictionary;
			Output: Dictionary;
		},
		File: {
			Input: File;
			Output: File;
		},
	};
}>({
	plugins: [
		ScopeAuthPlugin,
		ValidationPlugin,
	],
	authScopes: async (context) => ({
		public: true,
		protected: !!context.User,
	}),
	scopeAuthOptions: {
		treatErrorsAsUnauthorized: true,
		unauthorizedError: (parent, context, info) => {
			throw new GraphQLError(`Unauthorized: query ${info.fieldName}`);
		},
	},
});
