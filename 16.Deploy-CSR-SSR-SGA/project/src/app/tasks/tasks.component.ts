import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TaskComponent } from './task/task.component';
import { TasksService } from './tasks.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent, RouterLink],
})
export class TasksComponent {
  //form 1, usando o input da rota (para forma 2 ver UserTasksComponent)
  private tasksService = inject(TasksService);
  userId = input.required<string>(); //injetado automaticamente pela rota, pois o nome do input é o mesmo do parâmetro da rota (e temos na config withComponentInputBinding)
  order = input<'asc' | 'desc'>();
  orderLabel = computed(() => (this.order() === 'desc' ? 'Descending' : 'Ascending'));
  opositeOrder = computed(() => (this.order() === 'desc' ? 'asc' : 'desc'));

  userTasks = computed(() =>
    this.tasksService
      .allTasks()
      .filter((task) => task.userId === this.userId())
      .sort((a, b) => (this.order() === 'asc' ? a.id.localeCompare(b.id) : b.id.localeCompare(a.id))),
  );
}
