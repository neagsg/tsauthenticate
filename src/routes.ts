import { Router } from 'express';
import UserController from './app/controllers/UserController';
import AuthController from './app/controllers/AuthController';
import authMiddleware from './app/middlewares/authMiddleware';

const routes = Router();

routes.get('/users', authMiddleware, UserController.index);
routes.post('/users', UserController.create);
routes.post('/auth', AuthController.authenticate);

export default routes;
