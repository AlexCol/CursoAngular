import { inject, Injectable, signal } from '@angular/core';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { finalize, map, Subscription } from 'rxjs';
import { Place } from '../place.model';

@Injectable({
  providedIn: 'root',
})
export class UserPlacesService {
  //! constantes
  private readonly baseUrl = 'http://localhost:3000';
  private readonly userPlacesUrl = `${this.baseUrl}/user-places`;

  //! props injetadas
  private httpClient = inject(HttpClient);

  //! props normais
  private subscription: Subscription | undefined;

  //! signals
  private userPlacesSignal = signal<Place[]>([]);
  private isLoadingSignal = signal<boolean>(true);
  private errorSignal = signal<string | undefined>(undefined);
  private pendingAdditionsSignal = signal<Set<Place['id']>>(new Set());

  //! props publicas
  loadedUserPlaces = this.userPlacesSignal.asReadonly();
  isLoading = this.isLoadingSignal.asReadonly();
  error = this.errorSignal.asReadonly();
  pendingAdditions = this.pendingAdditionsSignal.asReadonly();

  //! metodos publicos
  loadUserPlaces(setLoading = true) {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    //! reseta estado da tela antes de iniciar uma nova requisição
    if (setLoading) {
      this.isLoadingSignal.set(true);
    }
    this.errorSignal.set(undefined);

    this.subscription = this.httpClient
      .get<{ places: Place[] }>(this.userPlacesUrl, {
        observe: 'response',
      })
      .pipe(
        map((response) => response.body?.places),
        finalize(() => {
          this.isLoadingSignal.set(false);
        }),
      )
      .subscribe({
        next: (places) => {
          this.userPlacesSignal.set(places || []);
        },
        error: (error: HttpErrorResponse) => {
          this.errorSignal.set(
            error.error?.message ?? error.message ?? 'An unknown error occurred while loading user places.',
          );
        },
      });
  }

  addPlaceToUserPlaces(place: Place) {
    const exists = this.userPlacesSignal().some((userPlace) => userPlace.id === place.id);
    const isPending = this.pendingAdditionsSignal().has(place.id);

    //! impede adicionar um local que já existe ou que já está sendo adicionado
    if (exists || isPending) {
      return;
    }

    //! marca como pendente antes de iniciar a requisição
    this.addPendingAddition(place.id);

    this.httpClient
      .put(`${this.userPlacesUrl}/`, {
        placeId: place.id,
      })
      .pipe(finalize(() => this.removePendingAddition(place.id)))
      .subscribe({
        next: () => {
          //! atualiza apenas o estado local, evitando uma nova requisição.
          //! Ideal quando esta aplicação é a única responsável por alterar essa lista.
          this.userPlacesSignal.update((places) => [...places, place]);

          //! alternativamente, recarrega a lista a partir da API para garantir
          //! que o estado local reflita exatamente o estado atual do servidor.
          //! Útil quando outros usuários ou processos também podem alterar os dados.
          //this.loadUserPlaces(false);
        },
        error: (error: HttpErrorResponse) => {
          this.errorSignal.set(
            error.error?.message ?? error.message ?? 'An unknown error occurred while adding the user place.',
          );
        },
      });
  }

  removeUserPlace(place: Place) {}

  //! metodos privados
  private addPendingAddition(placeId: Place['id']) {
    this.pendingAdditionsSignal.update((pendingAdditions) => {
      const updatedPendingAdditions = new Set(pendingAdditions);
      updatedPendingAdditions.add(placeId);
      return updatedPendingAdditions;
    });
  }

  private removePendingAddition(placeId: Place['id']) {
    this.pendingAdditionsSignal.update((pendingAdditions) => {
      const updatedPendingAdditions = new Set(pendingAdditions);
      updatedPendingAdditions.delete(placeId);
      return updatedPendingAdditions;
    });
  }
}
