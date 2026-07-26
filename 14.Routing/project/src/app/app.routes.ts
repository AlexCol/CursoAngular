import { Routes } from '@angular/router';
import { NoTaskComponent } from './tasks/no-task/no-task.component';
import { UserTasksComponent } from './users/user-tasks/user-tasks.component';

export const routes: Routes = [
  //{ path: '', redirectTo: 'tasks', pathMatch: 'full' },
  { path: '', component: NoTaskComponent },
  //{ path: 'tasks', component: TasksComponent },
  { path: 'users/:userId/tasks', component: UserTasksComponent },
];
