import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  private subscription: Subscription | null = null;

  ngOnInit(): void {
    const observable = interval(1000);
    const subscription = observable.subscribe({
      next: (value) => {
        console.log(value);
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {
        console.log('Completed');
      },
    });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

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
