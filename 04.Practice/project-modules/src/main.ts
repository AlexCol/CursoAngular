import { platformBrowser } from '@angular/platform-browser';
import { AppModule } from './app/app.module';

// platformBrowserDynamic()
//   .bootstrapModule(AppModule)
//   .catch((err: unknown) => console.error(err));

//necessário para uso dos modulos
//npm install @angular/platform-browser-dynamic@^21.2.0

platformBrowser()
  .bootstrapModule(AppModule)
  .catch((err: unknown) => console.error(err));
