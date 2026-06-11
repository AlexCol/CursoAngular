import { Component } from '@angular/core';
import { ButtonComponent } from '../../../../shared/button/button';
import { dashboardStyles } from '../../dashboard.styles';

@Component({
  selector: 'app-new-ticket',
  templateUrl: './new-ticket.html',
  imports: [ButtonComponent],
})
export class NewTicketComponent {
  protected readonly styles = dashboardStyles;
}
