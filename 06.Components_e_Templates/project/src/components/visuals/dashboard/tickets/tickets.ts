import { Component } from '@angular/core';
import { dashboardStyles } from '../dashboard.styles';
import { NewTicketComponent } from './new-ticket/new-ticket';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.html',
  imports: [NewTicketComponent],
})
export class TicketsComponent {
  protected readonly styles = dashboardStyles;
}
