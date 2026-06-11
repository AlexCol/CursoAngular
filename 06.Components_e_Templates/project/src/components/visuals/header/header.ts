import { Component } from '@angular/core';
import { ButtonComponent } from '../../shared/button/button';
import { headerStyles } from './header.styles';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  imports: [ButtonComponent],
})
export class HeaderComponent {
  protected readonly styles = headerStyles;
}
