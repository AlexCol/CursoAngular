import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrl: './login.css',
  imports: [FormsModule, RouterLink],
})
export class LoginComponent {
  private readonly authService = inject(AuthService);

  protected readonly credentials = {
    email: '',
    password: '',
    remember: false,
  };

  protected login(form: NgForm): void {
    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }

    if (this.credentials.email === 'eu_axil@yahoo.com.br' && this.credentials.password === 'mock') {
      this.authService.login();
    }
  }
}
