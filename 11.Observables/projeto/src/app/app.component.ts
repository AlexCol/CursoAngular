import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  clickCount = signal(0);
  clickCount$ = toObservable(this.clickCount); //usar $ é uma conversão de boas práticas para indicar que é um observable
  interval = signal(0);

  constructor() {
    // effect(() => {
    //   console.log('Click count:', this.clickCount());
    // });
  }

  private subscription: Subscription | null = null;
  ngOnInit(): void {
    this.destroyRef.onDestroy(() => {
      this.subscription?.unsubscribe();
    });
  }

  onClick() {
    if (this.clickCount() >= 10 && this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
      console.log('Unsubscribed');
      this.clickCount.set(0); // Reset the click count to 0 after unsubscribing
      return;
    }

    if (!this.subscription) {
      // console.log('Recebendo o valor assim que inscrito.');
      this.subscription = this.clickCount$.subscribe((count) => {
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
