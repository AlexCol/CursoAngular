import { Component } from '@angular/core';
import { ButtonComponent } from '../../../../shared/button/button';
import { ControlComponent } from '../../../../shared/control/control';
import { newTicketStyles } from './new-ticket.styles';

@Component({
  selector: 'app-new-ticket',
  templateUrl: './new-ticket.html',
  imports: [ButtonComponent, ControlComponent],
})
export class NewTicketComponent {
  protected readonly styles = newTicketStyles;
}
