import { Component } from '@angular/core';
import { LoginComponent } from './auth/login-reactive/login.component';
import { SignupComponent } from './auth/signup/signup.component';
//import { LoginComponent } from './auth/login-template/login.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [LoginComponent, SignupComponent],
})
export class AppComponent {}
