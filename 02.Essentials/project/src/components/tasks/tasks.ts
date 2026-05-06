import { Component, Input } from '@angular/core';
import { tasksStyles } from './tasks.styles';

@Component({
  selector: 'app-tasks',
  imports: [],
  templateUrl: './tasks.html',
})
export class TasksComponent {
  @Input({ required: true }) name!: string | undefined;
  protected readonly styles = tasksStyles;
}
