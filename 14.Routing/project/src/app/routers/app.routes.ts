import { Routes } from '@angular/router';
import { NotFoundComponent } from '../not-found/not-found.component';
import { NoTaskComponent } from '../tasks/no-task/no-task.component';
import { UserTasksComponent } from '../users/user-tasks/user-tasks.component';
import { userTasksRoutes } from './user-tasks.routes';

export const routes: Routes = [
  //{ path: '', redirectTo: 'tasks', pathMatch: 'full' },
  {
    path: '',
    component: NoTaskComponent,
    //redirectTo: 'users/u1', pathMatch: 'prefix', //!dá ruim com prefix, pois o redirectTo é relativo ao path do pai, e não ao path absoluto da url
  },
  //{ path: 'tasks', component: TasksComponent },
  {
    path: 'users/:userId',
    component: UserTasksComponent,
    children: userTasksRoutes,
  },
  { path: '**', component: NotFoundComponent },
];

// pathMatch defines how Angular matches the route's path against the
// remaining URL segments at the current level of the route tree:
//
// - 'prefix' (default): the route matches when the remaining URL starts
//   with the configured path.
//   Example: path: 'users' matches 'users', 'users/u1' and 'users/u1/tasks'.
//
// - 'full': the route matches only when the configured path consumes
//   the entire remaining URL.
//   Example: inside the children of 'users/:userId', path: '' with
//   pathMatch: 'full' matches only when no child segment remains.
//
// For /users/u1:
// - 'users/:userId' is consumed by the parent route;
// - the remaining child URL is empty ('');
// - this redirect matches and adds 'tasks' relative to the parent path;
// - the resulting URL is /users/u1/tasks.
//
// For /users/u1/tasks:
// - the remaining child URL is 'tasks';
// - path: '' with pathMatch: 'full' does not match;
// - Angular continues and matches the child route path: 'tasks'.
//
// If pathMatch were 'prefix', path: '' would match every remaining URL,
// because every string starts with an empty prefix. That could make the
// redirect also match 'tasks', causing repeated or invalid redirects.
