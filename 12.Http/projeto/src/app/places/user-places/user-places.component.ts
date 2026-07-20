import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, finalize, map, throwError } from 'rxjs';
import { Place } from '../place.model';
import { PlacesContainerComponent } from '../places-container/places-container.component';
import { PlacesComponent } from '../places.component';

@Component({
  selector: 'app-user-places',
  standalone: true,
  templateUrl: './user-places.component.html',
  styleUrl: './user-places.component.css',
  imports: [PlacesContainerComponent, PlacesComponent],
})
export class UserPlacesComponent implements OnInit {
  private httpCliente = inject(HttpClient);
  private destroyRef = inject(DestroyRef);
  places = signal<Place[] | undefined>(undefined);
  isLoading = signal<boolean>(true);
  error = signal<string | undefined>(undefined);

  ngOnInit() {
    const subscription = this.httpCliente //api tem um delay de 3s
      .get<{ places: Place[] }>('http://localhost:3000/user-places', { observe: 'response' })
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
}
