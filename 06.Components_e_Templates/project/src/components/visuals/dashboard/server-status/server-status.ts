import { AfterViewInit, Component, OnInit, signal } from '@angular/core';
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
  currentStatusSignal = signal<ServerStatus>('unknown');

  get currentStatus() {
    return this.currentStatusSignal();
  }

  constructor() {
    // const statuses: ServerStatus[] = ['online', 'offline', 'unknown'];
    // const randomIndex = Math.floor(Math.random() * statuses.length);
    // this.currentStatus = statuses[randomIndex];
  }

  ngOnInit() {
    console.log('ON INIT');
    setInterval(() => {
      //! pra de fato atualizar a UI, precisa ser usado Signal
      const statuses: ServerStatus[] = ['online', 'offline', 'unknown'];
      const randomIndex = Math.floor(Math.random() * statuses.length);
      this.currentStatusSignal.set(statuses[randomIndex]);
    }, 5000);
  }

  ngAfterViewInit() {
    console.log('AFTER VIEW INIT');
  }
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
