///criando como função
//criando resolver usado na criação da rota (para não precisar criar a busca do usuário dentro do componente)

import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { Task } from './task/task.model';
import { TasksService } from './tasks.service';

//funções 'resolvers' podem usufruir de injeção de dependência, mas não podem usar lifecycle hooks, nem decorators como @Input, @Output, @ViewChild, etc...
export const resolveUserTasks: ResolveFn<Task[]> = async (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  //console.log('Resolver resolveUserTasks executado.');
  const tasksService = inject(TasksService);
  const userId = route.params['userId'] as string;
  const order = route.queryParams['order'] as 'asc' | 'desc';
  const userTasks = tasksService.allTasks().filter((t) => t.userId === userId);
  const orderedTasks = userTasks.sort((a, b) => (order === 'asc' ? a.id.localeCompare(b.id) : b.id.localeCompare(a.id)));
  return orderedTasks ?? [];
};
