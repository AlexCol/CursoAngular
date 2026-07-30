import { DatePipe } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CardComponent } from '../../shared/card/card.component';
import { TasksService } from '../tasks.service';
import { type Task } from './task.model';

@Component({
  selector: 'app-task',
  standalone: true,
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
  imports: [DatePipe, CardComponent],
})
export class TaskComponent {
  task = input.required<Task>();
  private tasksService = inject(TasksService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  onComplete() {
    this.tasksService.removeTask(this.task().id);
    console.log('oi');

    //onComplete então precisa 'recarregar' a rota, para que o resolver seja reexecutado e a lista de tarefas seja atualizada
    //visto que userTasks não é mais um signal, mas sim vem de um resolver, então precisa recarregar a rota para que o resolver seja reexecutado e a lista de tarefas seja atualizada
    this.router.navigate(['./'], {
      relativeTo: this.activatedRoute,
      onSameUrlNavigation: 'reload', //serve para que a rota seja recarregada, mesmo que seja a mesma
      queryParamsHandling: 'preserve', //serve para que os query params sejam preservados, mesmo que seja a mesma rota
    });
  }
}
