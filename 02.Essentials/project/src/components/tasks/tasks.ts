import { Component, Input } from '@angular/core';
import { TaskComponent } from '../task/task';
import { tasksStyles } from './tasks.styles';

@Component({
  selector: 'app-tasks',
  imports: [TaskComponent],
  host: {
    class: 'block min-h-0 md:h-full',
  },
  templateUrl: './tasks.html',
})
export class TasksComponent {
  @Input({ required: true }) name!: string | undefined;
  protected readonly styles = tasksStyles;
}
