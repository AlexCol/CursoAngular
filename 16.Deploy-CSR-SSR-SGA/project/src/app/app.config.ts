import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding, withRouterConfig } from '@angular/router';
import { routes } from './routers/app.routes';
import { provideClientHydration } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withComponentInputBinding(), //importante pois variaveis da rota são amarrados a inputs do componente com o mesmo nome (ex: userId)
      withRouterConfig({
        paramsInheritanceStrategy: 'always', //importante para que o parâmetro userId da rota pai seja passado para a rota filha (tasks)
      }),
    ), provideClientHydration(),
  ],
};
