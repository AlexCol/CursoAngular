import { Component } from '@angular/core';
import { NewTicketComponent } from './new-ticket/new-ticket';
import { ticketsStyles } from './tickets.styles';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.html',
  imports: [NewTicketComponent],
})
export class TicketsComponent {
  protected readonly styles = ticketsStyles;
}
