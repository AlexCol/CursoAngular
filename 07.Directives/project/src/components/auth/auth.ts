import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { LogDirective } from '../../custom-directives/log.directive';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  imports: [FormsModule],
  templateUrl: './auth.html',
  styleUrl: './auth.css',
  hostDirectives: [LogDirective], //assim é como se a appLog fosse usada diretamente no componente, sem precisar colocar no html
})
export class AuthComponent {
  email = signal('');
  password = signal('');
  private authService = inject(AuthService);

  onSubmit() {
    this.authService.authenticate(this.email(), this.password());
  }
}
