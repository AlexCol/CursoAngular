import { Component, computed, inject, input } from '@angular/core';

import { TaskComponent } from './task/task.component';
import { TasksService } from './tasks.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent],
})
export class TasksComponent {
  //form 1, usando o input da rota (para forma 2 ver UserTasksComponent)
  private tasksService = inject(TasksService);
  userId = input.required<string>(); //injetado automaticamente pela rota, pois o nome do input é o mesmo do parâmetro da rota (e temos na config withComponentInputBinding)

  userTasks = computed(() => this.tasksService.allTasks().filter((task) => task.userId === this.userId()));
}
