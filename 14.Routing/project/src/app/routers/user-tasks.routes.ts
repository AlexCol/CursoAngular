import { Routes } from '@angular/router';
import { canDeactivateGuard } from '../guards/can-deactivate.guard';
import { NewTaskComponent } from '../tasks/new-task/new-task.component';
import { TasksComponent } from '../tasks/tasks.component';
import { resolveUserTasks } from '../tasks/tasks.resolver';

export const userTasksRoutes: Routes = [
  { path: '', redirectTo: 'tasks', pathMatch: 'full' },
  {
    path: 'tasks',
    component: TasksComponent,
    runGuardsAndResolvers: 'paramsOrQueryParamsChange', //sem isso, o resolver não é reexecutado se apenas quem mudar for a query param (ele muda apenas se mudar a rota 'base')
    resolve: { userTasks: resolveUserTasks },
  },
  {
    path: 'tasks/new',
    component: NewTaskComponent,
    canDeactivate: [canDeactivateGuard /*CanDeactivateGuard*/], //! informações sobre guards, ver app.routes.ts
  },
];

/*
 * Define quando Guards e Resolvers devem ser executados novamente caso a
 * navegação permaneça na mesma rota.
 *
 * Opções:
 * - 'paramsChange' (padrão): quando mudarem os parâmetros da rota
 *   (path ou matrix params). Alterações apenas nos query params não reexecutam.
 *
 * - 'pathParamsChange': somente quando mudarem os parâmetros do caminho
 *   (ex.: '/users/1' -> '/users/2'). Matrix params são ignorados.
 *
 * - 'paramsOrQueryParamsChange': quando mudarem os parâmetros da rota
 *   ou os query params.
 *
 * - 'pathParamsOrQueryParamsChange': quando mudarem os parâmetros do
 *   caminho ou os query params. Matrix params são ignorados.
 *
 * - 'always': executa em toda navegação para a rota, independentemente
 *   de alterações nos parâmetros.
 */
