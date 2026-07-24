import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    logRequest(request);

    //! pode-se mudar a request, por exemplo, adicionando um header customizado
    //const req = request.clone({
    //headers: request.headers.set('X-Custom-Header', 'MyCustomHeaderValue'),
    //setHeaders: { 'X-Custom-Header': 'MyCustomHeaderValue' },
    //});
    //logRequest(req);

    const startTime = Date.now();
    return next.handle(request).pipe(
      tap({
        next: (event: HttpEvent<unknown>) => logResponse(event, startTime),
        error: (error: HttpErrorResponse) => logError(error, startTime),
      }),
    );
  }
}

//metodos para criar o console.log (pra manter o foco na estrutura do interceptor)
export function logRequest(request: HttpRequest<unknown>) {
  console.log('🔵 HTTP Request:', {
    method: request.method,
    url: request.url,
    headers: request.headers,
  });
}

export function logResponse(event: HttpEvent<unknown>, startTime: number) {
  if (event instanceof HttpResponse) {
    console.log('🟢 HTTP Response:', {
      status: event.status,
      url: event.url,
      duration: `${Date.now() - startTime}ms`,
    });
  }
}

export function logError(error: HttpErrorResponse, startTime: number) {
  console.error('🔴 HTTP Error:', {
    status: error.status,
    message: error.message,
    url: error.url,
    duration: `${Date.now() - startTime}ms`,
  });
}
