import { afterNextRender, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoggerService } from '../../services/logger.service';

@Component({
  imports: [RouterOutlet],
  selector: 'app-root-layout',
  host: { '[class]': 'styles.container' },
  template: `
    <!-- <div class="{{ styles.container }}"> -->
    <header class="{{ styles.header }}">Header</header>
    <main class="{{ styles.main }}">
      <router-outlet />
    </main>
    <footer class="{{ styles.footer }}">Footer</footer>
    <!-- </div> -->
  `,
})
export class RootLayout {
  private logger = inject(LoggerService);
  styles = rootLayoutStyles;

  constructor() {
    afterNextRender(() => {
      this.logger.log('RootLayout runs only on client.');
    });
  }
}

//#region styles
const rootLayoutStyles = {
  container: 'h-full flex flex-col flex-1 overflow-hidden',
  header: 'h-14 flex items-center justify-between px-4 border-b bg-purple-500',
  main: 'h-full flex-1 overflow-y-auto',
  footer: 'h-14 flex items-center justify-center border-t mt-auto bg-amber-500',
};
//#endregion
