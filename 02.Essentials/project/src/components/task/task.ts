import { Component, Input } from '@angular/core';
import { Task } from '../../models/Task';
import { taskStyles } from './task.styles';

@Component({
  selector: 'app-task',
  imports: [],
  templateUrl: './task.html',
})
export class TaskComponent {
  @Input({ required: true }) task!: Task;
  protected readonly styles = taskStyles;
}
