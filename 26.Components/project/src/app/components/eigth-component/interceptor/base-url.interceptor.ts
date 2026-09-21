import { HttpInterceptorFn } from '@angular/common/http';

export const baseUrlInterceptor: HttpInterceptorFn = (req, next) => {
  const baseUrl = 'https://fakestoreapi.com/';

  req = req.clone({ url: `${baseUrl}${req.url}` });

  return next(req);
};
