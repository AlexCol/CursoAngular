import { Injectable } from '@angular/core';
import { NewTask } from '../../models/NewTask';
import { Task } from '../../models/Task';

@Injectable({ providedIn: 'root' })
export class TasksService {
  // private tasks: Task[] = DUMMY_TASKS;
  private tasks: Task[];
  constructor() {
    this.tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
  }

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
    this.saveTasksToLocalStorage();
  }

  removeTask(taskId: string) {
    this.tasks = this.tasks.filter((task) => task.id !== taskId);
    this.saveTasksToLocalStorage();
  }

  //! PRIVATE METHODS
  private getNextTaskId(): string {
    const nextId = Math.max(...this.tasks.map((task) => +task.id.replace('t', '')), 0) + 1;
    return `t${nextId}`;
  }

  private saveTasksToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }
}
