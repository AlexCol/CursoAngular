import { inject, Injectable, signal } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { catchError, finalize, map, throwError } from 'rxjs';
import { Place } from './place.model';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private userPlaces = signal<Place[]>([]);
  private httpCliente = inject(HttpClient);

  loadedUserPlaces = this.userPlaces.asReadonly();

  loadAvailablePlaces() {
    return this.fetchPlaces('http://localhost:3000/places');
  }

  loadUserPlaces() {
    return this.fetchPlaces('http://localhost:3000/user-places');
  }

  addPlaceToUserPlaces(placeId: string) {
    return this.httpCliente.put(`http://localhost:3000/user-places/`, {
      placeId,
    });
  }

  removeUserPlace(place: Place) {}

  private fetchPlaces(url: string) {
    return this.httpCliente //api tem um delay de 3s
      .get<{ places: Place[] }>(url, { observe: 'response' })
      .pipe(
        map((response) => response.body?.places),
        finalize(() => console.log('Request finalized')), //metodo chamado quando a stream é finalizada, seja com sucesso ou erro

        //metodo chamado quando ocorre um erro na stream, como falha de rede ou erro do servidor
        catchError((error) => {
          console.log('Error fetching places:', error); //pode-se 'transformar' o erro aqui, caso queira, antes de repassar para o subscribe
          return throwError(() => error); //repassando o erro para o subscribe, para ser tratado no error do subscribe
        }),
      );
  }
}
