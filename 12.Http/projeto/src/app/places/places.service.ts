import { inject, Injectable, signal } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { catchError, finalize, map, tap, throwError } from 'rxjs';
import { Place } from './place.model';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private userPlaces = signal<Place[]>([]);
  private httpCliente = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:3000';
  private readonly availablePlacesUrl = `${this.baseUrl}/places`;
  private readonly userPlacesUrl = `${this.baseUrl}/user-places`;
  loadedUserPlaces = this.userPlaces.asReadonly();

  loadAvailablePlaces() {
    return this.fetchPlaces(this.availablePlacesUrl);
  }

  loadUserPlaces() {
    return this.fetchPlaces(this.userPlacesUrl).pipe(
      tap({
        next: (places) => {
          this.userPlaces.set(places || []);
        },
      }),
    );
  }

  addPlaceToUserPlaces(placeId: string) {
    return this.httpCliente.put(`${this.userPlacesUrl}/`, {
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
