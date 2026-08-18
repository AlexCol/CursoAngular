import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class FifthComponentService {
  getNumberObservable() {
    return new Observable<number>((observer) => {
      let count = 0;
      const interval = setInterval(() => {
        observer.next(count++);

        if (count > 5) {
          observer.complete();
        }
      }, 1000);
      return () => clearInterval(interval);
    });
  }
}
