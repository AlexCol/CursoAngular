import { HttpClient } from '@angular/common/http';
import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { map } from 'rxjs';
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

  ngOnInit() {
    const subscription = this.httpCliente //api tem um delay de 3s
      .get<{ places: Place[] }>('http://localhost:3000/places', { observe: 'response' })
      .pipe(map((response) => response.body?.places))
      .subscribe({
        //recebendo places, pois foi ajustado no map para não vir a response inteira
        next: (places) => {
          console.log(places); //¹
          this.places.set(places);
        },
        error: (error) => {
          console.log('Error fetching places:', error);
        },
      });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}

/*
¹ a resposta pode ser impactada pelo parametro 'observe'
com observe: 'response', tenho o retorno completo da resposta, incluindo status, headers e body
com observe: 'body' (ou sem nada), retorna apenas o corpo da resposta, que é o que normalmente queremos.
com observe: 'event', retorna eventos de progresso da requisição, útil para upload/download de arquivos.
*/
