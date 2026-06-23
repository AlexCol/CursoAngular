import { Component, input, output } from '@angular/core';
import { Ticket } from '../../../../../models/types/Ticket';
import { ticketStyles } from './ticket.styles';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.html',
  imports: [],
})
export class TicketComponent {
  protected readonly styles = ticketStyles;

  ticket = input.required<Ticket>();

  closeEvent = output<number>();
  closeTicket() {
    this.closeEvent.emit(this.ticket().id);
  }
}
