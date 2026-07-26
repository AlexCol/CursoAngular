import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
  imports: [ReactiveFormsModule],
})
export class SignupComponent {
  /****************************************************/
  /* Properties                                       */
  /****************************************************/
  signupForm = this.createFormGroup();
  roles = roles;
  sources = sources;

  /****************************************************/
  /* Public Methods                                   */
  /****************************************************/
  onSubmit() {
    const form = this.signupForm;
    console.log(form);

    const selectedSources = this.signupForm.value.source
      ?.map((checked, index) => (checked ? this.sources[index].value : null))
      .filter((value): value is string => value !== null);
    console.log('Selected Sources:', selectedSources);

    //usando 'valid' pois possui validador assíncrono, que deixa o form com status PENDING enquanto aguarda o resultado da validação
    if (!form.valid) {
      console.log('Form is invalid. Please correct the errors and try again.');
      return;
    }

    console.log(form.value);
  }

  onReset() {
    this.signupForm.reset();
  }

  /****************************************************/
  /* Private Methods                                  */
  /****************************************************/
  private createFormGroup() {
    return new FormGroup(
      {
        email: new FormControl('', {
          validators: [Validators.required, Validators.email],
        }),

        passwords: new FormGroup(
          {
            password: new FormControl('', {
              validators: [Validators.required, Validators.minLength(6)],
            }),
            confirmPassword: new FormControl('', {
              validators: [Validators.required, Validators.minLength(6)],
            }),
          },
          {
            validators: [
              //passwordsMatchValidator,
              equalValues('password', 'confirmPassword'),
            ], //validador para o formGroup de senhas
            updateOn: 'blur', //validador só será executado quando o usuário sair do campo de senha
          },
        ),

        name: new FormGroup({
          firstName: new FormControl('', {
            validators: [Validators.required],
          }),
          lastName: new FormControl('', {
            validators: [Validators.required],
          }),
        }),

        address: new FormGroup({
          street: new FormControl('', {
            validators: [Validators.required],
          }),
          number: new FormControl('', {
            validators: [Validators.required],
          }),
          postalCode: new FormControl('', {
            validators: [Validators.required],
          }),
          city: new FormControl('', {
            validators: [Validators.required],
          }),
        }),

        role: new FormControl<roleType['value']>(roles[0].value, {
          validators: [Validators.required],
        }),

        source: new FormArray<FormControl<boolean>>(
          sources.map(() => new FormControl(false, { nonNullable: true })),
          {
            validators: [atLeastOneSourceSelectedValidator],
          },
        ),

        terms: new FormControl(false, {
          validators: [Validators.required],
        }),
      },
      {
        validators: [], //validador para o formGroup geral
      },
    );
  }
}

/****************************************************/
/* Tipos                                            */
/****************************************************/
type sourceType = { label: string; value: string };
const sources: sourceType[] = [
  { label: 'Google', value: 'google' },
  { label: 'Facebook', value: 'facebook' },
  { label: 'Twitter', value: 'twitter' },
  { label: 'Friend', value: 'friend' },
  { label: 'Other', value: 'other' },
] as const;

type roleType = { label: string; value: string };
const roles: roleType[] = [
  { label: 'Student', value: 'student' },
  { label: 'Teacher', value: 'teacher' },
  { label: 'Employee', value: 'employee' },
  { label: 'Founder', value: 'founder' },
  { label: 'Other', value: 'other' },
] as const;

/****************************************************/
/* Custom Validador                                 */
/****************************************************/
function passwordsMatchValidator(control: AbstractControl) {
  console.log(control);
  const password = control.get('password')?.value;
  const confirmPassword = control.get('confirmPassword')?.value;

  if (password !== confirmPassword) {
    return { passwordsMismatch: true };
  }
  return null;
}

//forma generica para comparar se dois campos são iguais
function equalValues(controlName1: string, controlName2: string) {
  return (control: AbstractControl) => {
    const value1 = control.get(controlName1)?.value;
    const value2 = control.get(controlName2)?.value;

    if (value1 !== value2) {
      return { valuesNotEqual: true };
    }
    return null;
  };
}

function atLeastOneSourceSelectedValidator(control: AbstractControl) {
  const sourceArray = control as FormArray<FormControl<boolean>>;
  const hasAtLeastOneSelected = sourceArray.controls.some((control) => control.value);

  if (!hasAtLeastOneSelected) {
    return { sourceRequired: true };
  }

  return null;
}
