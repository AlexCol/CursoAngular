import { Routes } from '@angular/router';
import { canDeactivateGuard } from '../guards/can-deactivate.guard';
import { NewTaskComponent } from '../tasks/new-task/new-task.component';
import { resolveUserTasks } from '../tasks/tasks.resolver';
import { TasksService } from '../tasks/tasks.service';

export const userTasksRoutes: Routes = [
  { path: '', redirectTo: 'tasks', pathMatch: 'full' },
  {
    path: 'tasks',
    // component: TasksComponent, //assim é eager loading,
    loadComponent: () => import('../tasks/tasks.component').then((module) => module.TasksComponent), //assim é lazy loading (detalhes abaixo)
    runGuardsAndResolvers: 'always', //sem isso, o resolver não é reexecutado se apenas quem mudar for a query param (ele muda apenas se mudar a rota 'base')
    resolve: { userTasks: resolveUserTasks },
  },
  {
    path: 'tasks/new',
    component: NewTaskComponent, //assim é eager loading,
    //loadComponent: () => import('../tasks/new-task/new-task.component').then((module) => module.NewTaskComponent), //assim é lazy loading (detalhes abaixo)
    canDeactivate: [
      canDeactivateGuard, //resolver importado 'eagerly'
      /*CanDeactivateGuard*/
    ], //! informações sobre guards, ver app.routes.ts
  },
];

export const userTasksRoutesLazy: Routes = [
  {
    path: '',
    providers: [TasksService], //lazy loaded, pois o serviço é provido no route group que é lazy loaded
    children: userTasksRoutes, //lazy loaded de todo route group (detalhes em user-tasks.routes.ts)
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

/*
 * Eager loading:
 * Ao informar o componente diretamente em `component`, seu código é incluído
 * no mesmo bundle JavaScript desta configuração de rotas. Portanto, ele é
 * baixado quando esse bundle é carregado, mesmo que o usuário não acesse
 * especificamente esta rota.
 *
 * component: NewTaskComponent,
 *
 * Lazy loading:
 * `loadComponent` utiliza um import dinâmico, permitindo que o build coloque
 * o componente em um chunk JavaScript separado. Esse chunk é solicitado
 * somente quando o usuário navega para esta rota.
 *
 * Isso reduz o tamanho do bundle inicial, mas o primeiro acesso à rota pode
 * exigir uma requisição adicional para baixar o chunk.
 *
 * Importante: "eager" aqui significa eager em relação ao bundle que contém
 * esta configuração. Se `userTasksRoutes` já for carregado por `loadChildren`,
 * todo este grupo de rotas será lazy em relação ao bundle principal da aplicação.
 */
