import { Injectable, signal } from '@angular/core';
import { Task, TaskStatus } from './task.model';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private tasks = signal<Task[]>([]);
  public allTasks = this.tasks.asReadonly();

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
  }

  updateTaskStatus(taskId: string, newStatus: TaskStatus) {
    this.tasks.update((oldTasks) =>
      oldTasks.map((task) => (task.id === taskId ? { ...task, status: newStatus } : task)),
    );
  }
}
