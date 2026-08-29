import { afterNextRender, Component, inject } from '@angular/core';
import { LoggerService } from '../../../services/logger.service';
import { Counter } from './components/counter';
import { HomeUsers } from './components/home-users';

@Component({
  imports: [Counter, HomeUsers],
  selector: 'app-home',
  host: { '[class]': 'styles.container' },
  template: `
    <!-- <div [class]="styles.container"> -->
    <h1 [class]="styles.title">Home</h1>

    <!-- SIMPLE COUNTER - client side -->
    <app-counter />

    <!-- USING FETCH USERS SERVICE -->
    <app-home-users />
    <!-- </div> -->
  `,
})
export class Home {
  private logger = inject(LoggerService);
  styles = homeStyles;

  constructor() {
    afterNextRender(() => {
      this.logger.log('Home runs on client.');
    });
  }
}

//#region styles
const homeStyles = {
  container: 'min-h-full flex flex-col items-center overflow-y-auto py-4 gap-4',
  title: 'text-2xl font-bold',
};
//#endregion
