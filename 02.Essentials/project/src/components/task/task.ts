import { DatePipe } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Task } from '../../models/Task';
import { TasksService } from '../../services/tasks/tasks.service';
import { CardComponent } from '../card/card';
import { taskStyles } from './task.styles';

@Component({
  selector: 'app-task',
  imports: [CardComponent, DatePipe],
  templateUrl: './task.html',
})
export class TaskComponent {
  @Input({ required: true }) task!: Task;
  //@Output() complete = new EventEmitter<string>(); (usando servico para remover a tarefa, entao nao precisa mais do output)

  private _tasksService: TasksService = inject(TasksService);

  onCompleteTask() {
    this._tasksService.removeTask(this.task.id);
    //this.complete.emit(this.task.id);
  }

  protected readonly styles = taskStyles;
}
