import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NewTask } from '../../models/NewTask';
import { TasksService } from '../../services/tasks/tasks.service';
import { newTaskStyles } from './new-task.style';

@Component({
  selector: 'app-new-task',
  imports: [FormsModule], // Enables Angular template-driven forms and directives like ngModel/ngForm (behaving like the react version of e.preventDefault())
  templateUrl: './new-task.html',
})
export class NewTaskComponent {
  @Input({ required: true }) userId!: string;
  @Output() closeDialog = new EventEmitter<void>();
  //@Output() createTask = new EventEmitter<NewTask>(); // sem necessidade mais, já que foi adicionado service direto

  //! declare properties for two-way binding (without signal)
  enteredTitle = ''; //!lembrar que inputs two-way binding precisam ter a prop name tbm
  enteredSummary = ''; //!lembrar que inputs two-way binding precisam ter a prop name tbm
  enteredDate = ''; //!lembrar que inputs two-way binding precisam ter a prop name tbm

  //! declare properties for two-way binding (with signal)
  //! o uso com signal no html segue do mesmo jeito, ou seja, [(ngModel)]="enteredTitle"
  // enteredTitle = signal(''); //!lembrar que inputs two-way binding precisam ter a prop name tbm
  // enteredSummary = signal(''); //!lembrar que inputs two-way binding precisam ter a prop name tbm
  // enteredDate = signal(''); //!lembrar que inputs two-way binding precisam ter a prop name tbm

  //! DI sem construtor
  private _tasksService: TasksService = inject(TasksService);

  onCloseDialog() {
    this.closeDialog.emit();
  }

  onSubmit() {
    const newTask: NewTask = {
      title: this.enteredTitle,
      summary: this.enteredSummary,
      dueDate: this.enteredDate,
    };
    //this.createTask.emit(newTask); //emitindo para o componente pai (tasks)
    this._tasksService.addTask(this.userId, newTask); //adicionando direto no service (sem emitir para o componente pai)
    this.closeDialog.emit();
  }

  protected readonly styles = newTaskStyles;
}
