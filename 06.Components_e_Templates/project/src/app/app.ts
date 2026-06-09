import { Component } from '@angular/core';
import { DashboardComponent } from '../components/dashboard/dashboard';
import { HeaderComponent } from '../components/header/header';
import { appStyles } from './app.styles';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, DashboardComponent],
  templateUrl: './app.html',
})
export class App {
  protected readonly styles = appStyles;
}
