import { AfterViewInit, Component, DestroyRef, effect, inject, OnInit, signal } from '@angular/core';
import { ServerStatus } from '../../../../models/types/ServerStatus';
import { serverStatusStyles } from './server-status.styles';

@Component({
  selector: 'app-server-status',
  templateUrl: './server-status.html',
  host: { class: serverStatusStyles.statusPanel },
  imports: [],
})
export class ServerStatusComponent implements OnInit, AfterViewInit {
  //!informação do implements OnInit abaixo
  protected readonly styles = serverStatusStyles;
  private intervalId: number | undefined;
  currentStatusSignal = signal<ServerStatus>('unknown');
  private counter = signal<number>(0);

  //alternativa 2 para rodar algo 'on destroy' (quando o componente for destruído) -- carregado no onInit o metodo
  private destroyRef = inject(DestroyRef);

  get currentStatus() {
    return this.currentStatusSignal();
  }

  constructor() {
    // const statuses: ServerStatus[] = ['online', 'offline', 'unknown'];
    // const randomIndex = Math.floor(Math.random() * statuses.length);
    // this.currentStatus = statuses[randomIndex];

    //o signal é reativo, então podemos usar o effect para reagir a mudanças
    //effect é um hook do Angular que é executado sempre que o signal usado dentro dele muda de valor
    effect(() => {
      console.log('Current status:', this.currentStatusSignal());
    });

    //sobre cleanup, abaixo
    // effect((cleanUp) => {
    //   const intervalId = setInterval(() => {
    //     console.log('Counter:', this.counter());
    //     this.counter.update((value) => value + 1);
    //   }, 5000);

    //   cleanUp(() => clearInterval(intervalId));
    // });
  }

  ngOnInit() {
    console.log('ON INIT');
    this.intervalId = setInterval(() => {
      //! pra de fato atualizar a UI, precisa ser usado Signal
      const statuses: ServerStatus[] = ['online', 'offline', 'unknown'];
      const randomIndex = Math.floor(Math.random() * statuses.length);
      this.currentStatusSignal.set(statuses[randomIndex]);
    }, 5000);

    this.destroyRef.onDestroy(() => {
      console.log('ON DESTROY');
      if (this.intervalId !== undefined) {
        clearInterval(this.intervalId);
      }
    });
  }

  ngAfterViewInit() {
    console.log('AFTER VIEW INIT');
  }

  //alternativa 1 para rodar algo 'on destroy' (quando o componente for destruído)
  // ngOnDestroy() {
  //   console.log('ON DESTROY');
  //   if (this.intervalId !== undefined) {
  //     clearInterval(this.intervalId);
  //   }
  // }
}

/***************************/
/*
O Angular não exige que a classe implemente a interface OnInit.
Em tempo de execução ele apenas procura por um método chamado
'ngOnInit' e o executa caso exista.

Entretanto, implementar explicitamente a interface OnInit é
recomendado porque o TypeScript passa a validar a existência
e a assinatura do método. Isso ajuda a detectar erros de
digitação como 'ngonInit', que compilariam normalmente mas
nunca seriam chamados pelo Angular.
*/

/*
A função cleanUp(() => clearInterval(intervalId)) seria executada em dois momentos:

Quando o componente é destruído — Este é o caso principal aqui. O effect registra a função de limpeza, e quando o componente é removido da página (destroyed), Angular executa automaticamente essa função de limpeza, interrompendo o intervalo.

Se o effect for re-executado — Se alguma dependência reativa usada dentro do effect mudasse, Angular executaria a limpeza antes de rodar o effect novamente. Porém, neste caso específico, o effect não depende de nenhum sinal, então ele só é executado uma única vez (na inicialização), e a limpeza só ocorre na destruição do componente.
*/
