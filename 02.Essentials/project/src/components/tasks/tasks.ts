import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tasks',
  imports: [],
  templateUrl: './tasks.html',
})
export class TasksComponent {
  @Input({ required: true }) name!: string;
}
