import { Component, inject, OnInit } from '@angular/core';

import { Place } from '../place.model';
import { PlacesContainerComponent } from '../places-container/places-container.component';
import { PlacesComponent } from '../places.component';
import { UserPlacesService } from './user-places.service';

@Component({
  selector: 'app-user-places',
  standalone: true,
  templateUrl: './user-places.component.html',
  styleUrl: './user-places.component.css',
  imports: [PlacesContainerComponent, PlacesComponent],
})
export class UserPlacesComponent implements OnInit {
  //! props injetadas
  private userPlacesService = inject(UserPlacesService);

  //! props publicas
  places = this.userPlacesService.loadedUserPlaces;
  isLoading = this.userPlacesService.isLoading;
  error = this.userPlacesService.error;

  //! lifecycle hooks
  ngOnInit() {
    this.loadUserPlaces();
  }

  //! metodos publicos
  loadUserPlaces() {
    this.userPlacesService.loadUserPlaces();
  }

  onSelectPlace(place: Place) {
    this.userPlacesService.removeUserPlace(place);
  }
}
