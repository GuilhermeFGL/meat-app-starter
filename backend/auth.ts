import {Request, Response} from 'express';
import {User, users} from './user';

import * as jwt from 'jsonwebtoken';

export const handleAuthentication = (request: Request, response: Response) => {
	const user: User = request.body;
	if (isValid(user)) {
		const dbUser: User = users[user.email];
		const token = jwt.sign({sub: dbUser.email, iss: 'meat-api'}, 'meat-api-password');
		response.json({name: dbUser.name, email: dbUser.email, accessToken: token});
	} else {
		response.status(403).json({message: 'Dados inválidos'});
	}
};

function isValid(user: User): boolean {
	if (!user) {
		return false;
	}

	const dbUser = users[user.email]
	return dbUser != undefined && dbUser.matchers(user);
}
