import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/login.service';

@Component({
  selector: 'app-eighth-home',
  template: '<h1>Welcome to the Eighth Component Home Page</h1><button (click)="logout()">Logout</button>',
})
export class HomeComponent {
  private _authService = inject(AuthService);
  private _router = inject(Router);

  logout() {
    this._authService.logout();
    void this._router.navigate(['/eighth/login']);
  }
}
