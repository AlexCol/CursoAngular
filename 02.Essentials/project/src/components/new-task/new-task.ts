import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NewTask } from '../../models/NewTask';
import { newTaskStyles } from './new-task.style';

@Component({
  selector: 'app-new-task',
  imports: [FormsModule], // Enables Angular template-driven forms and directives like ngModel/ngForm (behaving like the react version of e.preventDefault())
  templateUrl: './new-task.html',
})
export class NewTaskComponent {
  @Output() closeDialog = new EventEmitter<void>();
  @Output() createTask = new EventEmitter<NewTask>();

  //! declare properties for two-way binding (without signal)
  enteredTitle = '';
  enteredSummary = '';
  enteredDate = '';

  //! declare properties for two-way binding (with signal)
  //! o uso com sginal no html segue do mesmo jeito, ou seja, [(ngModel)]="enteredTitle"
  // enteredTitle = signal('');
  // enteredSummary = signal('');
  // enteredDate = signal('');

  onCloseDialog() {
    this.closeDialog.emit();
  }

  onSubmit() {
    const newTask: NewTask = {
      title: this.enteredTitle,
      summary: this.enteredSummary,
      dueDate: this.enteredDate,
    };
    this.createTask.emit(newTask);
  }

  protected readonly styles = newTaskStyles;
}
