import { inject, Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, throwError } from 'rxjs';
import { Place } from '../place.model';

@Injectable({
  providedIn: 'root',
})
export class AvailablePlacesService {
  //! constantes
  private readonly baseUrl = 'http://localhost:3000';
  private readonly availablePlacesUrl = `${this.baseUrl}/places`;

  //! props injetadas
  private httpClient = inject(HttpClient);

  //! metodos publicos
  loadAvailablePlaces() {
    return (
      this.httpClient
        //lembrete: backend tem delay de 3s
        .get<{ places: Place[] }>(this.availablePlacesUrl, {
          observe: 'response',
        })
        .pipe(
          map((response) => response.body?.places || []),

          //apesar não controlar o estado do erro, o service é responsável por tratar o erro e retornar uma mensagem amigável para o componente, que é resposnável apenas pela exibição do erro
          catchError((error: HttpErrorResponse) => {
            let errorMessage = 'An unknown error occurred while loading available places.';
            if (error.error?.message) {
              errorMessage = error.error.message + '--a';
            } else if (error.message) {
              errorMessage = error.message + '--b';
            }
            return throwError(() => errorMessage);
          }),
        )
    );
  }
}
