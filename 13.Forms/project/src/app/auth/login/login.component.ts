import { afterNextRender, Component, DestroyRef, inject, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [FormsModule],
})
export class LoginComponent {
  private formTemplate = viewChild.required<NgForm>('form');
  private destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => {
      const form = this.formTemplate();

      this.populateFormDataFromLocalStorage(form);

      const sub = form.valueChanges
        ?.pipe(debounceTime(500)) //serve como um delay, se houver novas alterações no formulário, o debounceTime reinicia a contagem do tempo, e só após 500ms sem alterações, o subscribe é chamado.
        .subscribe({
          next: () => this.saveFormDataToLocalStorage(form),
        });

      this.destroyRef.onDestroy(() => sub?.unsubscribe());
    });
  }

  onSubmit(formData: NgForm) {
    const form = formData.form;
    if (form.invalid) return;

    const { email, password } = form.value;
    console.log(`Email: ${email}, Password: ${password}`);

    form.reset();
  }

  private populateFormDataFromLocalStorage(form: NgForm) {
    const savedEmail = this.getEmailFromLocalStorage();
    if (savedEmail) {
      // setTimeout necessário para evitar
      // There are no form controls registered with this group yet. If you're using ngModel,
      // you may want to check next tick (e.g. use setTimeout).
      setTimeout(() => {
        form.setValue({
          email: savedEmail,
          password: '',
        });
      }, 1);
    }
  }

  private saveFormDataToLocalStorage(form: NgForm) {
    if (!form.dirty) return;

    const values = form.value;
    const email = this.getEmailFromLocalStorage() || '';
    if (email !== values.email) {
      window.localStorage.setItem('login-form', JSON.stringify({ email: values.email }));
    }
  }

  private getEmailFromLocalStorage(): string | null {
    const savedData = window.localStorage.getItem('login-form');
    if (savedData) {
      const { email } = JSON.parse(savedData);
      return email;
    }
    return null;
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
