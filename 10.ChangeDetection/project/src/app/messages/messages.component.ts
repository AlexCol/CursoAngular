import { ChangeDetectionStrategy, Component } from '@angular/core';

import { MessagesListComponent } from './messages-list/messages-list.component';
import { NewMessageComponent } from './new-message/new-message.component';

@Component({
  selector: 'app-messages',
  standalone: true,
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css',
  imports: [MessagesListComponent, NewMessageComponent],
  changeDetection: ChangeDetectionStrategy.OnPush, // observação do funcionamento abaixo
})
export class MessagesComponent {
  get debugOutput() {
    console.log('[Messages] "debugOutput" binding re-evaluated.');
    return 'Messages Component Debug Output';
  }
}

/*
https://angular.io/guide/change-detection#onpush-change-detection-strategy

com em "ChangeDetectionStrategy.OnPush", o Angular só vai reavaliar os bindings do componente quando:
- a referência de um input do componente mudar (no caso do componente Messages, não tem inputs)
- um evento do próprio componente for disparado (no caso do componente Messages, o evento onAddMessage é disparado pelo componente NewMessage)
- um observable ligado a um binding emitir um novo valor (no caso do componente Messages, não tem observables ligados a bindings)

E afeta também os componentes filhos, que só vão reavaliar seus bindings quando um dos três casos acima acontecer com eles.
*/
