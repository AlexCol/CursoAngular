import { Router } from 'express';
import { UsersController } from './users.controller';

export function createUsersRouter(usersController: UsersController): Router {
  const router = Router();

  router.get('/', usersController.findAll);

  return router;
}
