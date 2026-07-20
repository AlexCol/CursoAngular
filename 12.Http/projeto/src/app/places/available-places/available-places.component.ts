import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { catchError, finalize, map, throwError } from 'rxjs';
import { Place } from '../place.model';
import { PlacesContainerComponent } from '../places-container/places-container.component';
import { PlacesComponent } from '../places.component';

@Component({
  selector: 'app-available-places',
  standalone: true,
  templateUrl: './available-places.component.html',
  styleUrl: './available-places.component.css',
  imports: [PlacesComponent, PlacesContainerComponent],
})
export class AvailablePlacesComponent implements OnInit {
  private httpCliente = inject(HttpClient);
  private destroyRef = inject(DestroyRef);
  places = signal<Place[] | undefined>(undefined);
  isLoading = signal<boolean>(true);
  error = signal<string | undefined>(undefined);

  ngOnInit() {
    const subscription = this.httpCliente //api tem um delay de 3s
      .get<{ places: Place[] }>('http://localhost:3000/places', { observe: 'response' })
      .pipe(
        map((response) => response.body?.places),
        finalize(() => this.isLoading.set(false)), //metodo chamado quando a stream é finalizada, seja com sucesso ou erro

        //metodo chamado quando ocorre um erro na stream, como falha de rede ou erro do servidor
        catchError((error) => {
          console.log('Error fetching places:', error); //pode-se 'transformar' o erro aqui, caso queira, antes de repassar para o subscribe
          return throwError(() => error); //repassando o erro para o subscribe, para ser tratado no error do subscribe
        }),
      )
      .subscribe({
        //recebendo places, pois foi ajustado no map para não vir a response inteira
        next: (places) => {
          console.log(places); //¹
          this.places.set(places);
        },
        //complete só é chamado quando a stream é finalizada com sucesso, ou seja, não houve erro
        complete: () => {
          console.log('Request completed');
          this.error.set(undefined); //limpando o erro, caso tenha sido setado anteriormente
        },
        error: (errorResponse: HttpErrorResponse) => {
          this.error.set(errorResponse.error?.message || 'An error occurred while fetching places.');
        },
      });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  onSelectPlace(selectedPlace: Place) {
    this.httpCliente
      .put(`http://localhost:3000/user-places/`, {
        placeId: selectedPlace.id,
      })
      .subscribe({
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
