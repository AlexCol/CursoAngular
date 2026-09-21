import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _storageService = inject(StorageService);
  private readonly _httpClient = inject(HttpClient);

  private readonly tokenStorageKey = 'token';
  private token: string | null = null;

  constructor() {}
  login(userName: string, password: string): void {
    this._httpClient.post('auth/login', { username: userName, password: password }).subscribe(
      (response: any) => {
        if (response && response.token) {
          this.token = response.token;
          this._storageService.setData(this.tokenStorageKey, response.token);
        }
      },
      (error) => {
        console.error('Login failed', error);
      },
    );
  }

  logout(): void {
    this.token = null;
    this._storageService.clearData(this.tokenStorageKey);
  }

  getToken(): string | null {
    if (this.token === null) {
      this.token = this._storageService.getData<string>(this.tokenStorageKey);
    }

    return this.token;
  }
}
