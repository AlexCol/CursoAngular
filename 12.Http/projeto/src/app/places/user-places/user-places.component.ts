import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';

import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { PlacesContainerComponent } from '../places-container/places-container.component';
import { PlacesComponent } from '../places.component';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-user-places',
  standalone: true,
  templateUrl: './user-places.component.html',
  styleUrl: './user-places.component.css',
  imports: [PlacesContainerComponent, PlacesComponent],
})
export class UserPlacesComponent implements OnInit {
  private placesService = inject(PlacesService);
  private destroyRef = inject(DestroyRef);
  private subscription: Subscription | undefined;

  // places = signal<Place[] | undefined>(undefined);
  places = this.placesService.loadedUserPlaces;
  isLoading = signal<boolean>(true);
  error = signal<string | undefined>(undefined);

  ngOnInit() {
    this.loadUserPlaces();

    this.destroyRef.onDestroy(() => {
      this.subscription?.unsubscribe();
    });
  }

  loadUserPlaces() {
    this.subscription = this.placesService.loadUserPlaces().subscribe({
      //recebendo places, pois foi ajustado no map para não vir a response inteira
      // next ignorado, pois é alimentado a variavel places no service
      // next: (places) => {
      //   console.log(places); //¹
      //   this.places.set(places);
      // },
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
}
