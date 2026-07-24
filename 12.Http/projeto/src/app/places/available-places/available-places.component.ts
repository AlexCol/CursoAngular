import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';

import { HttpErrorResponse } from '@angular/common/http';
import { finalize, Subscription } from 'rxjs';

import { ErrorService } from '../../shared/error.service';
import { Place } from '../place.model';
import { PlacesContainerComponent } from '../places-container/places-container.component';
import { PlacesComponent } from '../places.component';
import { UserPlacesService } from '../user-places/user-places.service';
import { AvailablePlacesService } from './available-places.service';

@Component({
  selector: 'app-available-places',
  standalone: true,
  templateUrl: './available-places.component.html',
  styleUrl: './available-places.component.css',
  imports: [PlacesComponent, PlacesContainerComponent],
})
export class AvailablePlacesComponent implements OnInit {
  //! props injetadas
  private availablePlacesService = inject(AvailablePlacesService);
  private userPlacesService = inject(UserPlacesService);
  private destroyRef = inject(DestroyRef);
  private errorService = inject(ErrorService); //pra ter um service 'global de erros'

  //! subscriptions
  // mantém a referência da requisição atual para que ela possa ser cancelada manualmente antes de iniciar uma nova requisição
  private subscription?: Subscription;

  //! signals
  places = signal<Place[]>([]);
  isLoading = signal<boolean>(true);
  error = signal<string | undefined>(undefined);

  //! lifecycle hooks
  ngOnInit() {
    this.loadAvailablePlaces();

    // cancela uma eventual requisição ainda em andamento quando o componente for destruído
    this.destroyRef.onDestroy(() => {
      this.subscription?.unsubscribe();
    });
  }

  //! metodos publicos
  loadAvailablePlaces() {
    /*
     * Cancela a requisição anterior, caso ela ainda esteja em andamento.
     *
     * No caso do HttpClient, o unsubscribe também tenta abortar
     * ativamente a requisição HTTP no navegador.
     *
     * O cancelamento deve ocorrer antes de redefinir o isLoading,
     * pois o finalize da requisição anterior também será executado.
     */
    this.subscription?.unsubscribe();

    //! reseta estado da tela antes de iniciar uma nova requisição
    this.isLoading.set(true);
    this.error.set(undefined);

    this.subscription = this.availablePlacesService
      .loadAvailablePlaces()
      .pipe(
        /*
         * O finalize é executado quando o observable:
         * - completa com sucesso;
         * - termina com erro;
         * - é cancelado por unsubscribe.
         */
        finalize(() => {
          this.isLoading.set(false);
        }),
      )
      .subscribe({
        next: (places) => {
          this.places.set(places);
        },
        error: (error: HttpErrorResponse) => {
          const errorMessage =
            error.error?.message ?? error.message ?? 'An unknown error occurred while loading available places.';
          this.error.set(errorMessage);
          this.errorService.showError(errorMessage);
        },
      });
  }

  onSelectPlace(selectedPlace: Place) {
    this.userPlacesService.addPlaceToUserPlaces(selectedPlace);
  }
}

/*
¹ A resposta pode ser impactada pelo parâmetro `observe`.

Com `observe: 'response'`, o retorno contém a resposta completa,
incluindo status, headers e body.

Com `observe: 'body'` — ou sem informar `observe` — retorna apenas
o corpo da resposta, que é o comportamento mais comum.

Com `observe: 'events'`, retorna os eventos relacionados à requisição,
incluindo eventos de progresso, sendo útil principalmente em uploads
e downloads de arquivos.
*/
