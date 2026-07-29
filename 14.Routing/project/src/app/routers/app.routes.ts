import { Routes } from '@angular/router';

import { canMatchGuard } from '../guards/can-match.guard';
import { NotFoundComponent } from '../not-found/not-found.component';
import { NoTaskComponent } from '../tasks/no-task/no-task.component';
import { UserTasksComponent } from '../users/user-tasks/user-tasks.component';
import { resolveTitle, resolveUserName } from '../users/user-tasks/user-tasks.resolver';
import { userTasksRoutes } from './user-tasks.routes';

export const routes: Routes = [
  //{ path: '', redirectTo: 'tasks', pathMatch: 'full' },
  {
    path: '',
    component: NoTaskComponent,
    //redirectTo: 'users/u1', pathMatch: 'prefix', //!dá ruim com prefix, pois o redirectTo é relativo ao path do pai, e não ao path absoluto da url
    title: 'No user selected',
  },
  //{ path: 'tasks', component: TasksComponent },
  {
    path: 'users/:userId',
    component: UserTasksComponent,
    children: userTasksRoutes,
    //canActivate: [canActivateGuard /*CanActivateGuard*/], //diferenças sobre guards, abaixo
    canMatch: [canMatchGuard /*CanMatchGuard*/],
    title: resolveTitle, //pode ser um resolver para apresentar o titulo
    data: { message: 'Hello from the route data!' }, //injetar dados estaticos no componente
    resolve: { userName: resolveUserName }, //injetar dados dinamicos no componente (usando resolver como função)
    //resolve: { userName: UserNameResolver }, //injetar dados dinamicos no componente (usando resolver como classe)
    // detalhes sobre input capturar dados de rota, query params, data estatico e resolver, ver UserTasksComponent
  },
  { path: '**', component: NotFoundComponent },
];

//#region Path Match Explanation
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
//#endregion

//#region canMatch vs canActivate
/*
 * canMatch, canActivate e canDeactivate atuam em momentos diferentes
 * da navegação:
 *
 * - canMatch: define se uma configuração de rota pode ser considerada.
 *   Se retornar false, o Angular ignora essa rota e tenta encontrar a próxima
 *   configuração compatível. É útil quando existem rotas concorrentes com o
 *   mesmo path, como layouts diferentes para usuários autenticados e visitantes.
 *
 * - canActivate: executa depois que a rota já foi selecionada e define se ela
 *   pode ser ativada. Se retornar false, a navegação é cancelada; o Angular não
 *   tenta a próxima rota. Caso seja necessário redirecionar, o guard deve retornar
 *   uma UrlTree, por exemplo: router.createUrlTree(['/login']).
 *
 * - canDeactivate: define se o usuário pode sair da rota atualmente ativa.
 *   Se retornar false, a navegação é cancelada e o usuário permanece na rota atual.
 *   É útil, por exemplo, para impedir a saída de uma página com alterações não
 *   salvas. O guard recebe o componente que está sendo abandonado e informações
 *   sobre as rotas atual e seguinte.
 *
 * Resumindo:
 * canMatch      -> esta configuração de rota deve ser usada?
 * canActivate   -> o usuário pode entrar na rota já selecionada?
 * canDeactivate -> o usuário pode sair da rota atualmente ativa?
 */
//#region
