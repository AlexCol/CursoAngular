import { AfterViewInit, Component, ElementRef, OnInit, output, signal, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NewTicket } from '../../../../../models/types/NewTicket';
import { ButtonComponent } from '../../../../shared/button/button';
import { ControlComponent } from '../../../../shared/control/control';
import { newTicketStyles } from './new-ticket.styles';

@Component({
  selector: 'app-new-ticket',
  templateUrl: './new-ticket.html',
  imports: [ButtonComponent, ControlComponent, FormsModule],
})
export class NewTicketComponent implements OnInit, AfterViewInit {
  protected readonly styles = newTicketStyles;
  @ViewChild('form') private form2?: ElementRef<HTMLFormElement>; //forma de capturar o #form (elemento com template variable) via ViewChild
  //private form2 = viewChild<ElementRef<HTMLFormElement>>('form'); //outra forma de capturar o #form (elemento com template variable) via ViewChild, mas usando a nova API do Angular 16
  //pra usar two way binding com signals
  enteredTitle = signal(''); //!lembrar que inputs two-way binding precisam ter a prop name tbm
  enteredText = signal(''); //!lembrar que inputs two-way binding precisam ter a prop name tbm

  //@Output() addTicket = new EventEmitter<{title: string; request: string}>();
  addTicket = output<NewTicket>();

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
    // console.log('Form submitted');
    // console.log('Title:', this.enteredTitle());
    // console.log('Request:', this.enteredText());

    if (!this.enteredText() || !this.enteredTitle()) {
      alert('Please fill in both title and request fields.');
      return;
    }

    const newTicket = {
      title: this.enteredTitle(),
      request: this.enteredText(),
    };
    this.addTicket.emit(newTicket);

    this.form2?.nativeElement.reset(); //usando a forma 1
    //this.form2()?.nativeElement.reset(); //usando a forma 2
  }

  ngOnInit(): void {
    console.log('new ticket oninit');
    console.log(this.form2); //forma 1
  }
  ngAfterViewInit(): void {
    console.log('new ticket afterviewinit');
    console.log(this.form2); //forma 2
  }
}
