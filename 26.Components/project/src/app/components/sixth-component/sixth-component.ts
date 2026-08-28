import { Component, effect, OnDestroy, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-sixth-component',
  templateUrl: './sixth-component.html',
  styleUrls: ['./sixth-component.css'],
})
export class SixthComponent implements OnInit, OnDestroy {
  counter = signal(0);

  constructor() {
    effect(() => {
      //forma 1, adicionando o
      console.log('Counter value:', this.counter());
    });
    effect(this.methodForUseEffect.bind(this)); //forma 2, com bind, em um metodo externo, bom para metodos longos
  }

  ngOnInit(): void {
    console.log('SixthComponent initialized');
  }

  ngOnDestroy(): void {
    console.log('SixthComponent destroyed');
  }

  add() {
    this.counter.update((value) => value + 1);
  }

  subtract() {
    this.counter.update((value) => value - 1);
  }

  reset() {
    this.counter.set(0);
  }

  private methodForUseEffect() {
    console.log('Counter value:', this.counter());
  }
}
