import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, inject, provideAppInitializer, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding, withRouterConfig } from '@angular/router';
import { apiBaseUrlInterceptor } from '../interceptors/api-base-url.interceptor';
import { AuthService } from '../services/auth/auth.service';
import { intectionTokens } from '../services/InectionTokens';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    ...intectionTokens,
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      withComponentInputBinding(), //importante pois variaveis da rota são amarrados a inputs do componente com o mesmo nome (ex: userId)
      withRouterConfig({
        paramsInheritanceStrategy: 'always', //importante para que o parâmetro userId da rota pai seja passado para a rota filha (tasks)
      }),
    ),
    provideHttpClient(withInterceptors([apiBaseUrlInterceptor])),
    provideAppInitializer(() => {
      return inject(AuthService).getMe();
    }),
  ],
};
