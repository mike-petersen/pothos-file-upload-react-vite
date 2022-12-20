import {YogaInitialContext} from "@graphql-yoga/node";
import {getIdentityInfoFromJwt} from "../lib/jwt";
import {GraphqlAdditionalContext, graphqlBuilder} from "./builder";

import './scalars/dictionary';
import './scalars/file';
import './common/base';
import './books/mutation';
import './books/resolver';
import './books/schema';

graphqlBuilder.queryType({});
graphqlBuilder.mutationType({});

export const graphqlContext = (initialContext: YogaInitialContext) => {
	const additionalContext: GraphqlAdditionalContext = {};

	if (initialContext.request.headers?.has('authorization')) {
		const authorization = initialContext.request.headers?.get('authorization');
		additionalContext.User = getIdentityInfoFromJwt(authorization ?? undefined) ?? undefined;
	}

	return {
		...initialContext,
		...additionalContext,
	};
};
