import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TaskComponent } from './task/task.component';
import { Task } from './task/task.model';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent, RouterLink],
})
export class TasksComponent {
  //form 1, usando o input da rota (para forma 2 ver UserTasksComponent)
  // private tasksService = inject(TasksService);
  // userId = input.required<string>(); //injetado automaticamente pela rota, pois o nome do input é o mesmo do parâmetro da rota (e temos na config withComponentInputBinding)

  //? comentado, pois resolvido userTasks com 'resolver'
  // userTasks = computed(() =>
  //   this.tasksService
  //     .allTasks()
  //     .filter((task) => task.userId === this.userId())
  //     .sort((a, b) => (this.order() === 'asc' ? a.id.localeCompare(b.id) : b.id.localeCompare(a.id))),
  // );

  //? forma 1 para pegar query params (mesma coisa que input)
  // order = input<'asc' | 'desc'>();
  // orderLabel = computed(() => (this.order() === 'desc' ? 'Descending' : 'Ascending'));
  // opositeOrder = computed(() => (this.order() === 'desc' ? 'asc' : 'desc'));

  //? forma 2 (mostrando aqui para pegar as query params)
  // private activatedRoute = inject(ActivatedRoute);
  // private destroyRef = inject(DestroyRef);
  // order = signal<'asc' | 'desc'>('desc'); //usando singnal no lugar de variavel comum, pois userTasks é computed, e sem um sinal pra avisar que mudou, ele não muda e a lista não se ordena
  // orderLabel = computed(() => (this.order() === 'desc' ? 'Descending' : 'Ascending'));
  // opositeOrder = computed(() => (this.order() === 'desc' ? 'asc' : 'desc'));
  // ngOnInit(): void {
  //   const sub = this.activatedRoute.queryParams.subscribe((params) => {
  //     console.log(params['order']);
  //     this.order.set(params['order']);
  //   });

  //   this.destroyRef.onDestroy(() => sub.unsubscribe());
  // }

  //? forma 'final',
  //? sem userId, pois não é necessário aqui, usado pelo resolver
  //? order vem de query params (usado tbm no resolver)
  //? userTasks vem do resolver
  order = input<'asc' | 'desc'>();
  userTasks = input<Task[]>();

  //? mantido esses aqui pra apresentação da Label e 'opositeOrder' pra montagem de nova rota
  //? atentar, pois sem runGuardsAndResolvers na configuração da rota, isso não recalcula (ver comentário em userTasksRoutes)
  orderLabel = computed(() => (this.order() === 'desc' ? 'Descending' : 'Ascending'));
  opositeOrder = computed(() => (this.order() === 'desc' ? 'asc' : 'desc'));
}

/*
 * Com withComponentInputBinding() habilitado, o Angular pode preencher
 * automaticamente @Input() e input() a partir de diferentes fontes da rota,
 * desde que o nome do input corresponda ao da propriedade disponível.
 *
 * Fontes suportadas:
 * - parâmetros de rota (/users/:userId -> userId)
 * - query params (?page=2 -> page)
 * - data estático da rota (data: { title: '...' })
 * - dados retornados por resolvers (resolve: { user: userResolver })
 *
 * Caso o mesmo nome exista em mais de uma fonte, o Angular utiliza a seguinte
 * ordem de precedência (maior prioridade por último):
 *
 * query params
 *     ↓
 * parâmetros de rota (e matrix params)
 *     ↓
 * data estático
 *     ↓
 * dados dos resolvers
 *
 * Assim, um valor retornado por um resolver sobrescreve um data estático,
 * que por sua vez sobrescreve um parâmetro de rota ou um query param com o
 * mesmo nome.
 */
