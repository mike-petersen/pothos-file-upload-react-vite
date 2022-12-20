import jwt, {JwtPayload} from "jsonwebtoken";
import {config} from "../config";

const jwtTokenFromHeader = (authorizationHeader?: string) => {
	return authorizationHeader ? authorizationHeader.replace('Bearer ', '').trim() : undefined;
}

export const getIdentityInfoFromJwt = (authorizationHeader?: string): JwtPayload | null => {
	if (!authorizationHeader) {
		console.log(`No authorization header`);
		return null;
	}

	try {
		const jwtToken = jwtTokenFromHeader(authorizationHeader);
		return jwt.verify(jwtToken!, config.jwtSecret, {issuer: config.jwtIss}) as any as JwtPayload;
	} catch(err) {
		console.error('error in getIdentityInfoFromJwt', err);
		return null;
	}
}
