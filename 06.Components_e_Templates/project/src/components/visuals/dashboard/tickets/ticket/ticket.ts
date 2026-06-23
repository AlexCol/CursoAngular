import { Component, input, output, signal } from '@angular/core';
import { Ticket } from '../../../../../models/types/Ticket';
import { ticketStyles } from './ticket.styles';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.html',
  imports: [],
})
export class TicketComponent {
  protected readonly styles = ticketStyles;
  private detailsVisibleSig = signal<boolean>(false);

  ticket = input.required<Ticket>();

  get detailsVisible() {
    return this.detailsVisibleSig();
  }

  closeEvent = output<void>();
  onMarkAsCompleted() {
    this.closeEvent.emit();
  }

  toggleDetails() {
    //this.detailsVisibleSig.set(!this.detailsVisibleSig());
    this.detailsVisibleSig.update((current) => !current);
  }
}
