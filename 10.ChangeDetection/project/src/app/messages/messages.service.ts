import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  //!como os componentes estão com ChangeDetectionStrategy.OnPush, precisamos usar signal para que o Angular
  //!saiba quando houve alteração no array de mensagens e atualize a view
  private messages = signal<string[]>([]);
  allMessages = this.messages.asReadonly();
  // message$ = new BehaviorSubject<string[]>([]); //! se não usar signal, precisamos usar BehaviorSubject para notificar os componentes que estão com ChangeDetectionStrategy.OnPush
  // private messages: string[] = [];
  // allMessages() {
  //   return this.messages;
  // }

  addMessage(message: string) {
    this.messages.update((messages) => [...messages, message]);
    // this.messages.push(message);
    // this.message$.next(this.messages);
  }
}
