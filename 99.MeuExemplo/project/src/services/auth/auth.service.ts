import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, of, tap } from 'rxjs';

type AuthStatus = 'loading' | 'authenticated' | 'anonymous';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly httpClient = inject(HttpClient);
  private readonly toastr = inject(ToastrService);
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
    this.toastr.success('Login realizado com sucesso!', 'Bem-vindo');
    //e ter um toast de erro em caso de falha (colocar no catch no observable)
  }

  logout() {
    // console.log('cai no logout');
    this._userData.set(null);
    this._status.set('anonymous');
    this.toastr.info('Logout realizado com sucesso!', 'Até logo');
  }

  getMe() {
    // não precisa passar , { withCredentials: true } pois ele é feito no interceptor
    return this.httpClient.get('/me').pipe(
      tap((user) => this.setUser(user)),
      catchError((error: HttpErrorResponse) => this.setAnonymous(error)),
    );
  }

  private setUser(user: any) {
    if (this._userData() === null) {
      this.toastr.success('Sessão restaurada.', 'Bem-vindo');
    }
    this._userData.set(user);
    this._status.set('authenticated');
  }

  private setAnonymous(error: HttpErrorResponse) {
    let msg = 'Sessão expirada.';
    if (error.status !== 401) {
      msg = `Erro ao restaurar sessão: ${error.message}`;
      this.toastr.error(msg, 'Erro');
    }

    if (this._userData() !== null) {
      this.toastr.error(msg, 'Erro');
    }
    this._userData.set(null);
    this._status.set('anonymous');
    return of(null); // O initializer precisa conseguir terminar normalmente.
  }
}
