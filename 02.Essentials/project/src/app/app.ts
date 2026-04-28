import { Component } from '@angular/core';
import { HeaderComponent } from '../components/header';
import { UserComponent } from "../components/user/user";
import { appStyles } from './app.styles';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, UserComponent],
  templateUrl: './app.html',
  //styleUrls: ['./app.css'],
})
export class App {
  protected readonly styles = appStyles;
}
