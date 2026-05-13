import { Component, EventEmitter, Output } from '@angular/core';
import { newTaskStyles } from './new-task.style';

@Component({
  selector: 'app-new-task',
  imports: [],
  templateUrl: './new-task.html',
})
export class NewTaskComponent {
  @Output() closeDialog = new EventEmitter<void>();

  onCloseDialog() {
    this.closeDialog.emit();
  }

  protected readonly styles = newTaskStyles;
}
