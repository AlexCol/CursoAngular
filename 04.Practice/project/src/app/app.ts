import { Component } from '@angular/core';
import { HeaderComponent } from '../components/header/header';
import { AppStyles } from './app.styles';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent],
  templateUrl: './app.html',
})
export class App {
  protected styles = AppStyles;
}
