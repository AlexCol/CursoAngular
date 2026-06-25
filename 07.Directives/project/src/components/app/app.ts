import { NgIf } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { AuthComponent } from '../auth/auth';
import { AuthService } from '../auth/auth.service';
import { LearningResourcesComponent } from '../learning-resources/learning-resources';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [LearningResourcesComponent, AuthComponent, NgIf],
})
export class App {
  protected readonly title = signal('project');
  public isAdmin = computed(() => this.authService.activePermission() === 'admin');

  //private authService = inject(AuthService);
  // ou
  constructor(private authService: AuthService) {}
}
