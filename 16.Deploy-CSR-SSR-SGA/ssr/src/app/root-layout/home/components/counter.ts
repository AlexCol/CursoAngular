import { afterNextRender, Component, inject, signal } from '@angular/core';
import { LoggerService } from '../../../../services/logger.service';

@Component({
  selector: 'app-counter',
  host: { '[class]': 'styles.container' },
  template: `
    <!-- <div [class]="styles.container"> -->
    <p [class]="styles.counter">Counter: {{ counter() }}</p>
    <div [class]="styles.buttonContainer">
      <button [class]="styles.button" (click)="handleIncrement()">Increment</button>
      <button [class]="styles.button" (click)="handleDecrement()">Decrement</button>
      <button [class]="styles.button" (click)="resetCounter()">Reset</button>
    </div>
    <!-- </div> -->
  `,
})
export class Counter {
  private logger = inject(LoggerService);
  styles = counterStyles;
  counter = signal(0);

  constructor() {
    afterNextRender(() => {
      this.logger.log('Counter runs only on client.');
    });
  }

  handleIncrement() {
    this.counter.update((value) => value + 1);
  }
  handleDecrement() {
    this.counter.update((value) => value - 1);
  }
  resetCounter() {
    this.counter.set(0);
  }
}

//#region  styles
const counterStyles = {
  container: 'w-full flex flex-col items-center gap-2',
  counter: 'text-lg',
  buttonContainer: 'flex gap-2',
  button: 'px-4 py-2 bg-blue-500 text-white rounded',
};
//#endregion

/*
      <div className="{{styles.container}}">
      <p className="{{styles.counter}}">Counter: {counter}</p>
      <div className="{{styles.buttonContainer}}">
        <button className="{{styles.button}}" onClick={{handleIncrement}}>
          Increment
        </button>
        <button className="{{styles.button}}" onClick={{handleDecrement}}>
          Decrement
        </button>
        <button className="{{styles.button}}" onClick={{resetCounter}}>
          Reset
        </button>
      </div>
    </div>
*/
