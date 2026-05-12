import { Component, Input } from '@angular/core';
import { Task } from '../../models/Task';
import { User } from '../../models/User';
import { TaskComponent } from '../task/task';
import { DUMMY_TASKS } from './dummy-tasks';
import { tasksStyles } from './tasks.styles';

@Component({
  selector: 'app-tasks',
  imports: [TaskComponent],
  host: {
    class: 'block min-h-0 md:h-full',
  },
  templateUrl: './tasks.html',
})
export class TasksComponent {
  @Input({ required: true }) user!: User;
  tasks: Task[] = DUMMY_TASKS;
  protected readonly styles = tasksStyles;

  get selectedUserTasks() {
    return this.tasks.filter((task) => task.userId === this.user.id);
  }

  onCompleteTask(taskId: string) {
    this.tasks = this.tasks.filter((task) => task.id !== taskId);
  }
}
