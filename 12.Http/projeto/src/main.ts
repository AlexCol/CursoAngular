import { bootstrapApplication } from '@angular/platform-browser';

import { HttpHandlerFn, HttpRequest, provideHttpClient, withInterceptors } from '@angular/common/http';
import { tap } from 'rxjs';
import { AppComponent } from './app/app.component';
import { logError, logRequest, logResponse } from './interceptors/logging.interceptor';

// forma usando DI com a class LoggingInterceptor criada
// bootstrapApplication(AppComponent, {
//   providers: [
//     provideHttpClient(withInterceptorsFromDi()),
//     { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true },
//   ],
// }).catch((err) => console.error(err));

//

// forma usando uma function
bootstrapApplication(AppComponent, {
  providers: [provideHttpClient(withInterceptors([loggingInterceptor]))],
}).catch((err) => console.error(err));

//function do interceptor
function loggingInterceptor(request: HttpRequest<unknown>, next: HttpHandlerFn) {
  logRequest(request);

  const startTime = Date.now();
  return next(request).pipe(
    tap({
      next: (event) => logResponse(event, startTime),
      error: (error) => logError(error, startTime),
    }),
  );
}
