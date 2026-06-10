import { Component } from '@angular/core';
import { dashboardStyles } from '../../dashboard.styles';

@Component({
  selector: 'app-new-ticket',
  templateUrl: './new-ticket.html',
  imports: [],
})
export class NewTicketComponent {
  protected readonly styles = dashboardStyles;
}
