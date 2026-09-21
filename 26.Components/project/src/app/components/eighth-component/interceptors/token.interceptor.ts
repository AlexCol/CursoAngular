import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/login.service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('tokenInterceptor called');

  const _authService = inject(AuthService);

  const token = _authService.getToken();
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return next(req);
};
