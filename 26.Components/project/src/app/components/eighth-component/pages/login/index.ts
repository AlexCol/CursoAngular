import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  imports: [ReactiveFormsModule],
})
export class LoginComponent {
  private _authService = inject(AuthService);
  private _router = inject(Router);

  form = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  onSubmit() {
    if (this.form.valid) {
      const { username, password } = this.form.value;
      if (username && password) {
        this._authService.login(username, password).subscribe({
          next: async () => {
            await this._router.navigate(['eighth']);
          },
          error: (error) => {
            console.error('Login failed', error);
          },
        });
      }
    }
  }
}
