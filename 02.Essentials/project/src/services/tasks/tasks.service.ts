import { Injectable } from '@angular/core';
import { DUMMY_TASKS } from '../../components/tasks/dummy-tasks';
import { NewTask } from '../../models/NewTask';
import { Task } from '../../models/Task';

@Injectable({ providedIn: 'root' })
export class TasksService {
  private tasks: Task[] = DUMMY_TASKS;

  //! METHODS
  getTasksByUserId(userId: string): Task[] {
    return this.tasks.filter((task) => task.userId === userId);
  }

  addTask(userId: string, newTask: NewTask) {
    const nextId = this.getNextTaskId();

    const taskToAdd: Task = {
      id: nextId,
      userId: userId,
      title: newTask.title,
      summary: newTask.summary,
      dueDate: newTask.dueDate,
    };

    this.tasks.unshift(taskToAdd);
  }

  removeTask(taskId: string) {
    this.tasks = this.tasks.filter((task) => task.id !== taskId);
  }

  //! PRIVATE METHODS
  private getNextTaskId(): string {
    const nextId = Math.max(...this.tasks.map((task) => +task.id.replace('t', '')), 0) + 1;
    return `t${nextId}`;
  }
}
