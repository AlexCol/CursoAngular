import { Component } from '@angular/core';
import { LoginComponent } from './auth/login-reactive/login.component';
//import { LoginComponent } from './auth/login-template/login.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [LoginComponent],
})
export class AppComponent {}
