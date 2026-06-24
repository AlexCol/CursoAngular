import { Component, signal } from '@angular/core';
import { AuthComponent } from '../auth/auth';
import { LearningResourcesComponent } from '../learning-resources/learning-resources';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [LearningResourcesComponent, AuthComponent],
})
export class App {
  protected readonly title = signal('project');
}
