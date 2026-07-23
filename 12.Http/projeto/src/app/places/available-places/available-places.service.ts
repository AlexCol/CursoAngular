import { inject, Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
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
        .pipe(map((response) => response.body?.places || []))
    );
  }
}
