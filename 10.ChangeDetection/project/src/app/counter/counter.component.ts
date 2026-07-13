import { ChangeDetectionStrategy, Component, inject, NgZone, OnInit, signal } from '@angular/core';

import { InfoMessageComponent } from '../info-message/info-message.component';

@Component({
  selector: 'app-counter',
  standalone: true,
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css',
  imports: [InfoMessageComponent],
  changeDetection: ChangeDetectionStrategy.OnPush, // observação do funcionamento em messages.component.ts
})
export class CounterComponent implements OnInit {
  private zone = inject(NgZone);
  count = signal(0);

  get debugOutput() {
    console.log('[Counter] "debugOutput" binding re-evaluated.');
    return 'Counter Component Debug Output';
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.count.set(0);
    }, 4000);

    //! mesmo não afetando a UI, vai chamar o 'change detection' e reavaliar o binding 'debugOutput'
    setTimeout(() => {
      console.log('Timer expired');
    }, 5000);

    //! rodando com 'NgZone.runOutsideAngular', não vai chamar o 'change detection' e não vai reavaliar o binding 'debugOutput'
    // this.zone.runOutsideAngular(() => { //comentado por ter configurar para não usar zone.js
    setTimeout(() => {
      console.log('Timer expired2');
    }, 6000);
    // });
  }

  onDecrement() {
    this.count.update((prevCount) => prevCount - 1);
  }

  onIncrement() {
    this.count.update((prevCount) => prevCount + 1);
  }
}
