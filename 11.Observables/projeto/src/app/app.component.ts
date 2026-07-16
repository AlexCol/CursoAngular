import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { interval, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  private destroyRef = inject(DestroyRef);

  private countSubscription: Subscription | null = null;
  clickCount = signal(0);
  clickCount$ = toObservable(this.clickCount); //usar $ é uma conversão de boas práticas para indicar que é um observable

  interval$ = interval(1000);
  intervalCount = toSignal(this.interval$, { initialValue: 0 }); //se criar um signal com observable, ele é 'disposed' automaticamente quando o componente é destruído, então não precisa de unsubscribe, mas se criar um observable com signal, precisa de unsubscribe

  private customIntervalSubscription: Subscription | null = null;
  customInterval$ = new Observable<number>((subscriber) => {
    let count = 0;
    const intervalId = setInterval(() => {
      console.log('Emitting value:', count);
      subscriber.next(count++);

      if (count > 5) {
        console.log('Completing observable');
        subscriber.complete();
      }
    }, 1500);

    return () => {
      clearInterval(intervalId);
    };
  });
  customIntervalCount = signal(0);

  constructor() {
    // effect(() => {
    //   console.log('Click count:', this.clickCount());
    // });
  }

  ngOnInit(): void {
    this.customIntervalSubscription = this.customInterval$.subscribe({
      next: (value) => {
        console.log('Custom Interval Count:', value);
        this.customIntervalCount.set(value);
      },
      complete() {
        console.log('Custom Interval Completed');
      },
    });
    this.destroyRef.onDestroy(() => {
      this.countSubscription?.unsubscribe();
      this.customIntervalSubscription?.unsubscribe();
    });
  }

  onClick() {
    if (this.clickCount() >= 10 && this.countSubscription) {
      this.countSubscription.unsubscribe();
      this.countSubscription = null;
      console.log('Unsubscribed');
      this.clickCount.set(0); // Reset the click count to 0 after unsubscribing
      return;
    }

    if (!this.countSubscription) {
      // console.log('Recebendo o valor assim que inscrito.');
      this.countSubscription = this.clickCount$.subscribe((count) => {
        console.log('Click count:', count);
      });
    }
    // console.log('antes do update');
    this.clickCount.update((count) => count + 1);
    // console.log('depois do update');
  }

  //! exemplo com multipipes
  // ngOnInit(): void {
  //   const observable = interval(1000); //interval que gera o value de forma sequencial a cada 1 segundo
  //   const subscription = observable
  //     .pipe(
  //       //dados são passados de pipe para pipe, então o primeiro multiplica por 2, o segundo map recebe valor alterado pelo primeiro map e soma 4, e o finalize é chamado quando o observable é finalizado
  //       map((value) => {
  //         console.log('Mapping value:', value);
  //         return value * 2;
  //       }),
  //       map((value) => {
  //         console.log('Mapping value again:', value);
  //         return value + 4;
  //       }),
  //       //finalize não recebe value
  //       finalize(() => {
  //         console.log('Finalized');
  //       }),
  //     )
  //     .subscribe({
  //       //aqui chega o valor alterado pelos pipes
  //       next(value) {
  //         console.log(value);
  //         if (value >= 10) {
  //           subscription.unsubscribe();
  //           console.log('Unsubscribed');
  //         }
  //       },
  //     });
  //   this.destroyRef.onDestroy(() => {
  //     subscription.unsubscribe();
  //   });
  // }

  // !exemplo sem pipe
  // ngOnInit(): void {
  //   const observable = interval(1000);
  //   const subscription = observable.subscribe({
  //     next: (value) => {
  //       console.log(value);
  //     },
  //     error: (err) => {
  //       console.error(err);
  //     },
  //     complete: () => {
  //       console.log('Completed');
  //     },
  //   });
  //   this.destroyRef.onDestroy(() => {
  //     subscription.unsubscribe();
  //   });
  // }

  // private subscription: Subscription | null = null;
  // get isSubscribed(): boolean {
  //   return this.subscription !== null;
  // }
  // onSubscription() {
  //   if (this.subscription) {
  //     this.subscription.unsubscribe();
  //     this.subscription = null;
  //     console.log('Unsubscribed');
  //   } else {
  //     const observable = interval(1000);
  //     this.subscription = observable.subscribe({
  //       next: (value) => {
  //         console.log(value);
  //       },
  //       error: (err) => {
  //         console.error(err);
  //       },
  //       complete: () => {
  //         console.log('Completed');
  //       },
  //     });
  //     console.log('Subscribed');
  //   }
  // }
}
