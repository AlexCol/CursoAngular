import { InjectionToken } from '@angular/core';

const baseUrl = 'http://localhost:3000/api';
export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

/* adicioanr em providers em app.config*/
export const intectionTokens = [{ provide: API_BASE_URL, useValue: baseUrl }];
