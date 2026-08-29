import { LoggerService } from '../../services/logger.service';
import type { User } from '../../models/Users';

export class UsersService {
  private logger: LoggerService;
  constructor() {
    this.logger = new LoggerService();
  }

  async findAll(): Promise<User[]> {
    this.logger.log('FindAll UsersService runs only on server.');
    const response = await fetch('https://jsonplaceholder.typicode.com/users');

    if (!response.ok) {
      throw new Error(`Erro ao buscar usuários: ${response.status}`);
    }

    return (await response.json()) as User[];
  }
}
