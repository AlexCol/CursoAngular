import { Component, inject, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private readonly router = inject(Router);
  protected readonly title = signal('project');

  async navigateToFirstComponent() {
    await this.router.navigate(['first']);
  }

  async navigateToSecondComponent() {
    await this.router.navigate(['second']);
  }

  async navigateToThirdComponent() {
    await this.router.navigate(['third']);
  }
}
