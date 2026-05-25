import { Component } from '@angular/core';
import { headerStyles } from './header.styles';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
})
export class HeaderComponent {
  protected styles = headerStyles;
}
