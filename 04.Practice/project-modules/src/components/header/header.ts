import { Component } from '@angular/core';
import { headerStyles } from './header.styles';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  standalone: false,
})
export class HeaderComponent {
  protected styles = headerStyles;
}
