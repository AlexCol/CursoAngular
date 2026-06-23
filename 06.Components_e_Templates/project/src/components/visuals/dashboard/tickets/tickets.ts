import { Component } from '@angular/core';
import { NewTicket } from '../../../../models/types/NewTicket';
import { Ticket } from '../../../../models/types/Ticket';
import { NewTicketComponent } from './new-ticket/new-ticket';
import { TicketComponent } from './ticket/ticket';
import { ticketsStyles } from './tickets.styles';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.html',
  imports: [NewTicketComponent, TicketComponent],
  //host: { class: ticketsStyles.newTicket },
})
export class TicketsComponent {
  protected readonly styles = ticketsStyles;
  tickets: Ticket[] = [];

  onAddTicket(ticket: NewTicket) {
    const newTicket: Ticket = {
      id: this.tickets.length + 1,
      title: ticket.title,
      request: ticket.request,
      status: 'open',
    };
    this.tickets.push(newTicket);
  }

  onCloseTicket(ticketId: number) {
    const ticketIndex = this.tickets.findIndex((ticket) => ticket.id === ticketId);
    if (ticketIndex !== -1) {
      this.tickets[ticketIndex].status = 'closed';
    }
    console.log(`Ticket with ID ${ticketId} has been closed.`);
  }
}
