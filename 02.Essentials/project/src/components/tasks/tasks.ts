import { Component, Input } from '@angular/core';
import { Task } from '../../models/Task';
import { User } from '../../models/User';
import { TasksService } from '../../services/tasks/tasks.service';
import { CardComponent } from '../card/card';
import { NewTaskComponent } from '../new-task/new-task';
import { TaskComponent } from '../task/task';
import { DUMMY_TASKS } from './dummy-tasks';
import { tasksStyles } from './tasks.styles';

@Component({
  selector: 'app-tasks',
  imports: [TaskComponent, NewTaskComponent, CardComponent],
  host: {
    class: 'block min-h-0 md:h-full',
  },
  templateUrl: './tasks.html',
})
export class TasksComponent {
  //! CONSTRUCTOR
  constructor(private _tasksService: TasksService) {}

  //? outra forma de injeta (sem usar construtor)
  //private _tasksService: TasksService = inject(TasksService);

  //! INPUTS
  @Input({ required: true }) user!: User;

  //! PROPERTIES
  tasks: Task[] = DUMMY_TASKS;
  private newTaskDialogOpen = false;
  protected readonly styles = tasksStyles;

  //! GETTERS
  get selectedUserTasks() {
    return this._tasksService.getTasksByUserId(this.user.id);
  }

  get isNewTaskDialogOpen() {
    return this.newTaskDialogOpen;
  }

  //! METHODS
  //! alterada responsabilidade para o 'taskComponent', então removido o metodo daqui
  // onCompleteTask(taskId: string) {
  //   this._tasksService.removeTask(taskId);
  // }

  openNewTaskDialog() {
    this.newTaskDialogOpen = true;
  }

  closeNewTaskDialog = () => {
    this.newTaskDialogOpen = false;
  };

  //! alterada responsabilidade para o 'newTaskComponent', então removido o metodo daqui
  // createTask(newTask: NewTask) {
  //   this._tasksService.addTask(this.user.id, newTask);
  //   this.closeNewTaskDialog();
  // }
}
