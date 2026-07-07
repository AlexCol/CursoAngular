import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';

/*
bootstrapApplication(AppComponent, {
  //! DI Forma 2: registrar os serviços diretamente no bootstrapApplication().
  //! O efeito é semelhante a usar @Injectable({ providedIn: 'root' }):
  //! haverá uma única instância compartilhada por toda a aplicação.
  //!
  //! Diferença: ao registrar o serviço aqui, ele passa a fazer parte da configuração
  //! inicial da aplicação e não pode ser removido por tree-shaking caso nunca seja utilizado.
  //!
  //! O serviço ainda deve possuir @Injectable() caso tenha dependências injetadas
  //! pelo construtor. A forma de injeção (constructor ou inject()) é independente
  //! de onde o provider foi registrado.
  providers: [TasksService],
}).catch((err) => console.error(err));
//*/

bootstrapApplication(AppComponent).catch((err) => console.error(err));
