import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';

type AuthStatus = 'loading' | 'authenticated' | 'anonymous';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly httpClient = inject(HttpClient);
  private _userData = signal<any>(null);
  private readonly _status = signal<AuthStatus>('loading');

  /****************************************/
  /* Getters                              */
  /****************************************/
  get isAuthenticated() {
    return this._status() === 'authenticated';
  }

  get isLoading() {
    return this._status() === 'loading';
  }

  /****************************************/
  /* Metodos                              */
  /****************************************/
  login() {
    // console.log('cai no login');
    this._userData.set('something');
    this._status.set('authenticated');
  }

  logout() {
    // console.log('cai no logout');
    this._userData.set(null);
    this._status.set('anonymous');
  }

  getMe() {
    // return this.httpClient
    //   .get('/me', {
    //     withCredentials: true,
    //   })
    //   .pipe(
    //     tap((user) => {
    //       console.log('cai no tap do getMe');
    //       this._userData.set(user);
    //       this._status.set('authenticated');
    //     }),
    //     catchError((error) => {
    //       console.log(error);
    //       this._userData.set(null);
    //       this._status.set('anonymous');
    //       return of(null); // O initializer precisa conseguir terminar normalmente.
    //     }),
    //   );
    return new Promise((resolve) => {
      setTimeout(() => {
        // console.log('cai no getMe');
        const random = Math.random();
        if (random < 0.5) {
          this._userData.set(null);
          this._status.set('anonymous');
          resolve(null);
          return;
        }

        this._userData.set('something');
        this._status.set('authenticated');
        resolve(null);
      }, 1000);
    });
  }
}
