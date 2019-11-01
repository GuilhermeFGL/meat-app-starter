import {Request, Response} from 'express';
import * as jwt from 'jsonwebtoken';

export const handleAuthorization = (request: Request, response: Response, callback) => {
	const token = extractToken(request);

	if (!token) {
		response.setHeader('WWW-Authenticate', 'Bearer token-type="JWT"')
		response.status(401).json({message: 'Você precisa se autentificar.'});
	} else {

	}
}