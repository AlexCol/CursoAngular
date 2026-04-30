import { Component } from '@angular/core';
import { headerStyles } from './header.styles';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  //styleUrls: ['./header.css'],
})
export class HeaderComponent {
  protected readonly styles = headerStyles;
}
