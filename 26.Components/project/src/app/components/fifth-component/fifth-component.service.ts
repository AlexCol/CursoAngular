import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { User } from './model/user';

@Injectable()
export class FifthComponentService {
  private readonly httpCliente = inject(HttpClient);

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

  getUsersObservable() {
    //usa async pipe no html, pra não precisar dar um subscribe
    return this.httpCliente.get<User[]>('https://jsonplaceholder.typicode.com/users');
  }
}
