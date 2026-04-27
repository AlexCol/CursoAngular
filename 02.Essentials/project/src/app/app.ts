import { Component } from '@angular/core';
import { HeaderComponent } from '../components/header';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App { }
