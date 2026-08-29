import { UsersService } from './users.service';
import type { NextFunction, Request, Response } from 'express';

export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  findAll = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const users = await this.usersService.findAll();

      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  };
}
