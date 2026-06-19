import { Component, ElementRef, signal, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../../../../shared/button/button';
import { ControlComponent } from '../../../../shared/control/control';
import { newTicketStyles } from './new-ticket.styles';

@Component({
  selector: 'app-new-ticket',
  templateUrl: './new-ticket.html',
  imports: [ButtonComponent, ControlComponent, FormsModule],
})
export class NewTicketComponent {
  protected readonly styles = newTicketStyles;
  @ViewChild('form') form2?: ElementRef<HTMLFormElement>; //forma de capturar o #form (elemento com template variable) via ViewChild

  //pra usar two way binding com signals
  enteredTitle = signal(''); //!lembrar que inputs two-way binding precisam ter a prop name tbm
  enteredText = signal(''); //!lembrar que inputs two-way binding precisam ter a prop name tbm

  //usando template variables (inicia na aula 130)
  onSubmit(title: string, request: string, form: HTMLFormElement) {
    console.log('Form submitted');
    console.log('Title:', title);
    console.log('Request:', request);
    form.reset();
  }

  //usando template variables para reset do form, mas lendo do twowaybinding
  onSubmit2(form: HTMLFormElement) {
    console.log('Form submitted');
    console.log('Title:', this.enteredTitle());
    console.log('Request:', this.enteredText());
    form.reset();
  }

  //sem template variables para reset do form, mas lendo do twowaybinding
  onSubmit3() {
    console.log('Form submitted');
    console.log('Title:', this.enteredTitle());
    console.log('Request:', this.enteredText());

    this.enteredTitle.set('');
    this.enteredText.set('');
  }

  //usando form capturado pelo ViewChild, lendo do twowaybinding
  onSubmit4() {
    console.log('Form submitted');
    console.log('Title:', this.enteredTitle());
    console.log('Request:', this.enteredText());

    this.form2?.nativeElement.reset();
  }
}
