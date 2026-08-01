import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { API_BASE_URL } from '../providers/non-visual/injectionTokens';

export const apiBaseUrlInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const baseUrl = inject(API_BASE_URL);

  // console.log('apiBaseUrlInterceptor', baseUrl, req.url);
  const apiRequest = req.clone({
    url: `${baseUrl}${req.url}`,
    withCredentials: true,
  });

  return next(apiRequest);
};
