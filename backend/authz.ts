import {Request, Response} from 'express';
import * as jwt from 'jsonwebtoken';
import {apiConfig} from './api-config';

export const handleAuthorization = (request: Request, response: Response, callback) => {
	const token = extractToken(request);

	if (!token) {
		response.setHeader('WWW-Authenticate', 'Bearer token-type="JWT"')
		response.status(401).json({message: 'Você precisa se autentificar.'});
	} else {
		jwt.verify(token, apiConfig.secret, (error, decoded) => {
			if (decoded) {
				callback();
			} else {
				response.status(403).json({message: 'Não autorizado.'});
			}
		});
	}
}

function extractToken(request: Request): string {
	let token = undefined;

	if (request.headers && request.headers.authorization) {
		const parts: string[] = request.headers.authorization.split(' ');
		if (parts.length === 2 && parts[0] === 'Bearer') {
			token = parts[1];
		}
	}

	return token;
}
