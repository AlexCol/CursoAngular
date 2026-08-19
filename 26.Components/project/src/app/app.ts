import { Component, inject, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App {
  private readonly router = inject(Router);
  protected readonly title = signal('project');

  async navigateToComponent(name: string) {
    await this.router.navigate([name]);
  }
}
