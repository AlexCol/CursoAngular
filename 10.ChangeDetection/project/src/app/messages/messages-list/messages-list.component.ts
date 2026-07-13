import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { MessagesService } from '../messages.service';

@Component({
  selector: 'app-messages-list',
  standalone: true,
  templateUrl: './messages-list.component.html',
  styleUrl: './messages-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush, // observação do funcionamento em messages.component.ts
})
export class MessagesListComponent implements OnInit {
  private messageService = inject(MessagesService);
  private cdRef = inject(ChangeDetectorRef); //! se não usar signal, precisamos injetar ChangeDetectorRef para forçar a atualização da view
  private destroyRef = inject(DestroyRef);

  messages: string[] = [];

  ngOnInit() {
    const subscription = this.messageService.message$.subscribe((messages: string[]) => {
      this.messages = messages;
      this.cdRef.markForCheck();
    });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  get debugOutput() {
    console.log('[MessagesList] "debugOutput" binding re-evaluated.');
    return 'MessagesList Component Debug Output';
  }
}
