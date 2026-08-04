import { Component, signal } from '@angular/core';
import { FirstComponent } from './components/first-component/first-component';

@Component({
  selector: 'app-root',
  imports: [FirstComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('project');
}
