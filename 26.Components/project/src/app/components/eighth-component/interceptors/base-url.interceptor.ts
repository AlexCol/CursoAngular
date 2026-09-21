import { HttpInterceptorFn } from '@angular/common/http';

export const baseUrlInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('baseUrlInterceptor called');

  const baseUrl = 'https://fakestoreapi.com/';

  req = req.clone({ url: `${baseUrl}${req.url}` });

  return next(req);
};
