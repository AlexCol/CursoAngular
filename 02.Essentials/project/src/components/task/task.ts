import { Component, Input } from '@angular/core';
import { taskStyles } from './task.styles';

@Component({
  selector: 'app-task',
  imports: [],
  templateUrl: './task.html',
})
export class TaskComponent {
  @Input({ required: true }) id!: string | undefined;
  protected readonly styles = taskStyles;
}
