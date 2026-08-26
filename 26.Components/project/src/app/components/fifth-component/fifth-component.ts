import { AsyncPipe } from '@angular/common';
import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';
import { FifthComponentService } from './fifth-component.service';
import { User } from './model/user';

@Component({
  selector: 'app-fifth-component',
  templateUrl: './fifth-component.html',
  styleUrls: ['./fifth-component.css'],
  imports: [AsyncPipe],
  providers: [FifthComponentService],
})
export class FifthComponent implements OnInit {
  private service = inject(FifthComponentService);
  private destroyRef = inject(DestroyRef);
  values = signal<number[]>([]);
  users$: Observable<User[]> | undefined;
  usersToSignal = toSignal(this.service.getUsersObservable(), { initialValue: [] as User[] });

  // Em Angular, a inicialização de subscriptions/fluxos de dados costuma ficar em ngOnInit,
  // porque esse ciclo de vida representa o momento em que o componente já foi criado e está
  // pronto para começar sua lógica. O constructor é mais indicado para injeções e setup simples.
  constructor() {}

  ngOnInit(): void {
    this.service
      .getNumberObservable()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (value) => {
          this.values.update((currentValues) => [...currentValues, value]);
        },
      });

    this.users$ = this.service.getUsersObservable();
  }
}
