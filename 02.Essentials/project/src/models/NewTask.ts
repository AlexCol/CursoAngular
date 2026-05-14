import { Task } from './Task';

export type NewTask = Omit<Task, 'id' | 'userId'>;
