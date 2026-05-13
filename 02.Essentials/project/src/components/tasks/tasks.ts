import { Component, Input } from '@angular/core';
import { Task } from '../../models/Task';
import { User } from '../../models/User';
import { NewTaskComponent } from '../new-task/new-task';
import { TaskComponent } from '../task/task';
import { DUMMY_TASKS } from './dummy-tasks';
import { tasksStyles } from './tasks.styles';

@Component({
  selector: 'app-tasks',
  imports: [TaskComponent, NewTaskComponent],
  host: {
    class: 'block min-h-0 md:h-full',
  },
  templateUrl: './tasks.html',
})
export class TasksComponent {
  //! INPUTS
  @Input({ required: true }) user!: User;

  //! PROPERTIES
  tasks: Task[] = DUMMY_TASKS;
  private newTaskDialogOpen = false;
  protected readonly styles = tasksStyles;

  //! GETTERS
  get selectedUserTasks() {
    return this.tasks.filter((task) => task.userId === this.user.id);
  }

  get isNewTaskDialogOpen() {
    return this.newTaskDialogOpen;
  }

  //! METHODS
  onCompleteTask(taskId: string) {
    this.tasks = this.tasks.filter((task) => task.id !== taskId);
  }

  openNewTaskDialog() {
    this.newTaskDialogOpen = true;
  }

  closeNewTaskDialog = () => {
    this.newTaskDialogOpen = false;
  };
}
