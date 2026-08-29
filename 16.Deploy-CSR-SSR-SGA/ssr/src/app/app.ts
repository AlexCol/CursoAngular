import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  imports: [RouterOutlet],
  selector: 'app-root',
  host: { class: 'flex min-h-dvh flex-col' },
  template: `<router-outlet />`,
})
export class App {
  protected readonly title = signal('ssr');
}
