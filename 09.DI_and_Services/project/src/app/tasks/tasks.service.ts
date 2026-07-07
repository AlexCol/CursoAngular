import { Injectable, signal } from '@angular/core';
import { LoggingService } from '../../services/logging';
import { Task, TaskStatus } from './task.model';

// DIForma1: informar direto no @Injectable() que o serviço será provido no root (raiz) da aplicação
// necessário para que o service seja injetado em outros serviços
@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private tasks = signal<Task[]>([]);
  public allTasks = this.tasks.asReadonly();

  constructor(private logger: LoggingService) {}
  //private logger = inject(LoggingService);

  addTask(taskData: { title: string; description: string }) {
    const nextId = this.tasks().reduce((maxId, task) => Math.max(maxId, parseInt(task.id)), 0) + 1;

    const newTask: Task = {
      id: nextId.toString(),
      // title: taskData.title,
      // description: taskData.description,
      ...taskData,
      status: 'OPEN',
    };
    this.tasks.update((tasks) => [...tasks, newTask]);

    this.logger.log(`Task added: ${newTask.title}`);
  }

  updateTaskStatus(taskId: string, newStatus: TaskStatus) {
    this.tasks.update((oldTasks) =>
      oldTasks.map((task) => (task.id === taskId ? { ...task, status: newStatus } : task)),
    );

    this.logger.log(`Task status updated: ${taskId} to ${newStatus}`);
  }
}
