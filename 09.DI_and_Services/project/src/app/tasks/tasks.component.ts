import { Component } from '@angular/core';

import { NewTaskComponent } from './new-task/new-task.component';
import { TasksListComponent } from './tasks-list/tasks-list.component';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  imports: [NewTaskComponent, TasksListComponent],

  //DIForma3: informar os providers diretamente no @Component, mas ele só será acessivel para o próprio componente e seus filhos (subcomponentes)
  //assim ele é singleton apenas 'daqui para baixo', se dois TasksComponent forem usados (ex: 2 <app-tasks /> em app.component.html),
  // cada um terá sua própria instância do serviço TasksService
  //providers: [TasksService],
})
export class TasksComponent {}
