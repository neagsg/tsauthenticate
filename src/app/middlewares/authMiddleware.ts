import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import authSecret from '../utils/authSecret';

interface JWTPayload {
	id: string;
	iat: number;
	exp: number;
}
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function authMiddleware(
	request: Request,
	response: Response,
	next: NextFunction,
) {
	const { authorization } = request.headers;

	if (!authorization) {
		return response.status(401).json();
	}

	const token = authorization.replace('Bearer', '').trim();

	try {
		const data = jwt.verify(token, authSecret.secret);
		const { id } = <JWTPayload>data;

		request.userId = id;

		return next();
	} catch {
		return response.status(401).json();
	}
}
