import {cacheExchange, createClient, dedupExchange} from "urql";
import { multipartFetchExchange } from '@urql/exchange-multipart-fetch';
import StorageHelper from "../lib/StorageHelper";

const tokenStorageKey = 'jwtToken';

const getJwtHeader = () => {
	const token = StorageHelper.getItem(tokenStorageKey);
	return token ? `Bearer ${token}` : '';
};

export const graphqlClient = createClient({
	url: 'http://localhost:4444/graphql',
	exchanges: [dedupExchange, cacheExchange, multipartFetchExchange],
	fetchOptions: () => {
		return {
			headers: {
				authorization: getJwtHeader(),
			},
		};
	},
});
