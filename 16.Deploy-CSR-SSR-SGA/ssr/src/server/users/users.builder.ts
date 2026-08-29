import { UsersController } from './users.controller';
import { createUsersRouter } from './users.routes';
import { UsersService } from './users.service';
import type { Express } from 'express';

export function addUsersEndpoints(app: Express) {
  const usersService = new UsersService();
  const usersController = new UsersController(usersService);
  const usersRouter = createUsersRouter(usersController);

  app.use('/api/users', usersRouter);
}
