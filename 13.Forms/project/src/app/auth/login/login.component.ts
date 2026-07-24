import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [FormsModule],
})
export class LoginComponent {
  onSubmit(formData: NgForm) {
    // console.log(formData.form);
    // console.log(formData.controls);
    // console.log(formData.value);

    const form = formData.form;
    if (form.invalid) {
      alert('Formulário inválido. Verifique os campos e tente novamente.');
      return;
    }

    const { email, password } = form.value;
    console.log(`Email: ${email}, Password: ${password}`);
  }
}

/*
 * NgForm funciona como uma fachada para o FormGroup interno, disponível em
 * `formData.form`. Por isso, `formData.value` espelha `formData.form.value`,
 * assim como `formData.controls` espelha `formData.form.controls`.
 *
 * Em geral, prefira os acessos diretos (`formData.value` e
 * `formData.controls`). Use `formData.form` quando precisar trabalhar
 * explicitamente com a API do FormGroup, por exemplo: `patchValue()`,
 * `addControl()` ou `removeControl()`.
 */
