import { HttpErrorResponse } from '@angular/common/http';
import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { Subscription } from 'rxjs';
import { Place } from '../place.model';
import { PlacesContainerComponent } from '../places-container/places-container.component';
import { PlacesComponent } from '../places.component';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-available-places',
  standalone: true,
  templateUrl: './available-places.component.html',
  styleUrl: './available-places.component.css',
  imports: [PlacesComponent, PlacesContainerComponent],
})
export class AvailablePlacesComponent implements OnInit {
  private placesService = inject(PlacesService);
  private destroyRef = inject(DestroyRef);
  private subscription: Subscription | undefined;
  places = signal<Place[] | undefined>(undefined);
  isLoading = signal<boolean>(true);
  error = signal<string | undefined>(undefined);

  ngOnInit() {
    this.loadAvailablePlaces();

    this.destroyRef.onDestroy(() => {
      this.subscription?.unsubscribe();
    });
  }

  loadAvailablePlaces() {
    this.subscription = this.placesService.loadAvailablePlaces().subscribe({
      //recebendo places, pois foi ajustado no map para não vir a response inteira
      next: (places) => {
        console.log(places); //¹
        this.places.set(places);
      },
      //complete só é chamado quando a stream é finalizada com sucesso, ou seja, não houve erro
      complete: () => {
        console.log('Request completed');
        this.isLoading.set(false);
        this.error.set(undefined); //limpando o erro, caso tenha sido setado anteriormente
      },
      error: (errorResponse: HttpErrorResponse) => {
        this.isLoading.set(false);
        this.error.set(errorResponse.error?.message || 'An error occurred while fetching places.');
      },
    });
  }

  onSelectPlace(selectedPlace: Place) {
    this.placesService.addPlaceToUserPlaces(selectedPlace.id).subscribe({
      next: (response) => {
        console.log('Place added to user places:', response);
      },
      error: (errorResponse: HttpErrorResponse) => {
        console.log('Error adding place to user places:', errorResponse);
      },
    });
  }
}

/*
¹ a resposta pode ser impactada pelo parametro 'observe'
com observe: 'response', tenho o retorno completo da resposta, incluindo status, headers e body
com observe: 'body' (ou sem nada), retorna apenas o corpo da resposta, que é o que normalmente queremos.
com observe: 'event', retorna eventos de progresso da requisição, útil para upload/download de arquivos.
*/
