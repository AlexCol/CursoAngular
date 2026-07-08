import { Component, computed, inject, signal } from '@angular/core';

import { TASK_STATUS_OPTIONS, taskStatusOptionsProvider } from '../task.model';
import { TasksService } from '../tasks.service';
import { TaskItemComponent } from './task-item/task-item.component';

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css',
  imports: [TaskItemComponent],
  providers: [taskStatusOptionsProvider],
})
export class TasksListComponent {
  selectedFilter = signal<string>('all');

  private tasksService = inject(TasksService);
  taskStatusOptions = inject(TASK_STATUS_OPTIONS);
  // constructor(
  //   private tasksService: TasksService,
  //   @Inject(TASK_STATUS_OPTIONS) public taskStatusOptions: TaskStatusOptions,
  // ) {}

  tasks = computed(() => {
    switch (this.selectedFilter()) {
      case 'all':
        return this.tasksService.allTasks();
      case 'open':
        return this.tasksService.allTasks().filter((task) => task.status === 'OPEN');
      case 'in-progress':
        return this.tasksService.allTasks().filter((task) => task.status === 'IN_PROGRESS');
      case 'done':
        return this.tasksService.allTasks().filter((task) => task.status === 'DONE');
      default:
        return this.tasksService.allTasks();
    }
  });
  // get tasks() {
  //   return this.tasksService.allTasks().filter((task) => {
  //     if (this.selectedFilter() === 'all') {
  //       return true;
  //     }
  //     return task.status === this.selectedFilter().toUpperCase();
  //   });
  // }

  onChangeTasksFilter(filter: string) {
    this.selectedFilter.set(filter);
  }
}
