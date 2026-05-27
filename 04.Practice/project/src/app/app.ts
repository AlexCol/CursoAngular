import { Component } from '@angular/core';
import { HeaderComponent } from '../components/header/header';
import { UserInputComponent } from '../components/user-input/user-input';
import { AppStyles } from './app.styles';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, UserInputComponent],
  templateUrl: './app.html',
})
export class App {
  protected styles = AppStyles;
}
