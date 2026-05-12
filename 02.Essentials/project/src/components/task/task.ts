import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../models/Task';
import { taskStyles } from './task.styles';

@Component({
  selector: 'app-task',
  imports: [],
  templateUrl: './task.html',
})
export class TaskComponent {
  @Input({ required: true }) task!: Task;
  @Output() complete = new EventEmitter<string>();

  onCompleteTask() {
    this.complete.emit(this.task.id);
  }

  protected readonly styles = taskStyles;
}
