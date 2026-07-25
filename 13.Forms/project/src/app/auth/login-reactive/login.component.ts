import { HttpClient } from '@angular/common/http';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { catchError, debounceTime, map, of, switchMap, tap, timer } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  /****************************************************/
  /* Properties                                       */
  /****************************************************/
  private destroyRef = inject(DestroyRef);

  form = new FormGroup({
    //forma de adicionar validação com objeto
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
      asyncValidators: [emailIsUnique], //validador assíncrono
      // updateOn: 'blur', //executa a validação assíncrona apenas quando o campo perde o foco
    }),
    password: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(6),
        mustContainQuestionMark, //validador personalizado
      ],
    }),

    //forma de adicionar validação com array
    // email: new FormControl('', [Validators.required, Validators.email]),
    // password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  /****************************************************/
  /* Getters                                          */
  /****************************************************/
  get emailIsInvalid() {
    const control = this.form.get('email');
    return control?.invalid && control?.touched && control?.dirty;
  }

  get passwordIsInvalid() {
    const control = this.form.get('password');
    return control?.invalid && control?.touched && control?.dirty;
  }

  /****************************************************/
  /* Lifecycle Hooks                                  */
  /****************************************************/
  ngOnInit(): void {
    this.populateFormDataFromLocalStorage(this.form);
    const sub = this.form.valueChanges
      .pipe(debounceTime(500)) //debounceTime serve como um delay, se houver novas alterações no formulário, o debounceTime reinicia a contagem do tempo, e só após 500ms sem alterações, o subscribe é chamado.
      .subscribe(() => this.saveFormDataToLocalStorage(this.form));

    this.destroyRef.onDestroy(() => sub.unsubscribe());
  }

  /****************************************************/
  /* Public Methods                                   */
  /****************************************************/
  onSubmit() {
    const form = this.form;
    //usando 'valid' pois possui validador assíncrono, que deixa o form com status PENDING enquanto aguarda o resultado da validação
    if (!form.valid) {
      return;
    }

    console.log(form.value);
  }

  /****************************************************/
  /* Private Methods                                  */
  /****************************************************/
  private populateFormDataFromLocalStorage(form: FormGroup) {
    const savedEmail = this.getEmailFromLocalStorage();
    if (savedEmail) {
      // form.setValue({ email: savedEmail, password: '' }); //forma 1 de atualizar o valor do formulário, mas precisa passar todos os campos do formulário
      form.patchValue({ email: savedEmail }); //forma 2 de atualizar o valor do formulário, mas não precisa passar todos os campos do formulário
      form.controls['email'].markAsDirty();
      form.controls['email'].markAsTouched();
    }
  }

  private saveFormDataToLocalStorage(form: FormGroup) {
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

//! validators personalizados
function mustContainQuestionMark(control: AbstractControl) {
  const value = control.value;
  if (value && value.includes('?')) {
    return null; //retorna null se não houver erro, ou seja, se a validação for bem sucedida
  }

  return { mustContainQuestionMark: true }; //retorna um objeto com a chave do erro se houver erro, ou seja, se a validação falhar
}

function emailIsUnique(control: AbstractControl) {
  const value = control.value;
  // Simulação de verificação de unicidade
  const isUnique = value !== 'test@example.com';
  if (isUnique) {
    return of(null); //retorna null se não houver erro, ou seja, se a validação for bem sucedida
  }
  return of({ emailIsNotUnique: true }).pipe(
    tap(() => {
      console.log('Email já está em uso');
    }),
  ); //retorna um objeto com a chave do erro se houver erro, ou seja, se a validação falhar
}

//!exemplo usando httpclient e não tendo o updateOn: 'blur', ou seja, a cada alteração do campo, o validador assíncrono é executado
//! ai temos um timer pra não fazer requisições a cada alteração do campo, mas sim a cada 500ms após a última alteração
function emailIsUnique2(control: AbstractControl) {
  return timer(500).pipe(
    switchMap(() =>
      inject(HttpClient).get<boolean>(`/api/users/email-exists?email=${encodeURIComponent(control.value)}`),
    ),
    map((exists) => (exists ? { emailIsNotUnique: true } : null)),
    catchError(() => of(null)),
  );
}

//!exemplo usando httpclient e updateOn: 'blur', ou seja, o validador assíncrono é executado apenas quando o campo perde o foco
function emailIsUnique3(control: AbstractControl) {
  return inject(HttpClient)
    .get<boolean>(`/api/users/email-exists?email=${encodeURIComponent(control.value)}`)
    .pipe(
      map((exists) => (exists ? { emailIsNotUnique: true } : null)),
      catchError(() => of(null)),
    );
}

//! Validador assíncrono.
//! Usado quando a validação depende de uma operação assíncrona (ex.: requisição HTTP).
//! Deve retornar um Observable ou Promise que resolve para:
//!   - null: validação aprovada;
//!   - { nomeDoErro: true }: validação reprovada.
//! O Angular só executa os asyncValidators se todos os validators síncronos passarem.
//! Enquanto aguarda o resultado, o controle fica com status PENDING (não é nem VALID nem INVALID).
//! Por isso, ao submeter o formulário, prefira verificar form.valid (ou form.pending)
//! em vez de apenas form.invalid.

//! Validador assíncrono, normalmente usado para consultas ao servidor.
//! Retorna Observable/Promise com null (válido) ou um objeto de erro.
//! Só é executado se os validators síncronos passarem.
//! Enquanto executa, o controle fica PENDING; por isso, o submit deve exigir form.valid.
//! Como o padrão updateOn é "change", pode executar a cada alteração do campo.
//! Para evitar várias requisições, use updateOn: "blur" ou aplique debounce antes da chamada HTTP.

//! O timer funciona como um debounce.
//! O Angular cancela a validação anterior sempre que o valor do campo muda.
//! Como a requisição HTTP só é criada após o timer emitir, validações canceladas
//! antes desse momento não chegam a enviar nenhuma requisição ao servidor.
