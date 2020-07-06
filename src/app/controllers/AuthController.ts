import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import bcript from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import secret from '../utils/authSecret';

class AuthController {
	async authenticate(request: Request, response: Response) {
		const repository = getRepository(User);
		const { email, password } = request.body;

		const user = await repository.findOne({ where: { email } });

		if (!user) {
			return response.status(401).json({ error: 'User not exists' });
		}

		const isValidPassword = await bcript.compare(password, user.password);

		if (!isValidPassword) {
			return response.status(401).json({ error: 'Password not exists' });
		}

		delete user.password;

		const token = jwt.sign({ id: user.id }, secret.secret, { expiresIn: '7d' });

		return response.json({
			user,
			token,
		});
	}
}

export default new AuthController();
