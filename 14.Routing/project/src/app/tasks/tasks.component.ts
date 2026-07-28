import { Component, computed, DestroyRef, inject, input, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TaskComponent } from './task/task.component';
import { TasksService } from './tasks.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent, RouterLink],
})
export class TasksComponent implements OnInit {
  //form 1, usando o input da rota (para forma 2 ver UserTasksComponent)
  private tasksService = inject(TasksService);
  userId = input.required<string>(); //injetado automaticamente pela rota, pois o nome do input é o mesmo do parâmetro da rota (e temos na config withComponentInputBinding)

  userTasks = computed(() =>
    this.tasksService
      .allTasks()
      .filter((task) => task.userId === this.userId())
      .sort((a, b) => (this.order() === 'asc' ? a.id.localeCompare(b.id) : b.id.localeCompare(a.id))),
  );

  //forma 1 para pegar query params (mesma coisa que input)
  // order = input<'asc' | 'desc'>();
  // orderLabel = computed(() => (this.order() === 'desc' ? 'Descending' : 'Ascending'));
  // opositeOrder = computed(() => (this.order() === 'desc' ? 'asc' : 'desc'));

  // forma 2 (mostrando aqui para pegar as query params)
  private activatedRoute = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);
  order = signal<'asc' | 'desc'>('desc'); //usando singnal no lugar de variavel comum, pois userTasks é computed, e sem um sinal pra avisar que mudou, ele não muda e a lista não se ordena
  orderLabel = computed(() => (this.order() === 'desc' ? 'Descending' : 'Ascending'));
  opositeOrder = computed(() => (this.order() === 'desc' ? 'asc' : 'desc'));
  ngOnInit(): void {
    const sub = this.activatedRoute.queryParams.subscribe((params) => {
      console.log(params['order']);
      this.order.set(params['order']);
    });

    this.destroyRef.onDestroy(() => sub.unsubscribe());
  }
}
