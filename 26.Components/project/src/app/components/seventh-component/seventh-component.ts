import { JsonPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-seventh-component',
  templateUrl: './seventh-component.html',
  styleUrls: ['./seventh-component.css'],
  imports: [ReactiveFormsModule, JsonPipe],
})
export class SeventhComponent {
  text = signal('');

  form = new FormGroup({
    //forma de adicionar validação com objeto
    firstInput: new FormControl('', {
      validators: [Validators.required],
      updateOn: 'blur', //executa a validação assíncrona apenas quando o campo perde o foco
    }),
    secondInput: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6)],
      updateOn: 'blur', //executa a validação assíncrona apenas quando o campo perde o foco
    }),
  });

  onSubmit() {
    if (this.form.valid) {
      this.form.reset();
    }
  }
}
