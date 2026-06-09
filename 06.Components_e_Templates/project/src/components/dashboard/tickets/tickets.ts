import { Component } from '@angular/core';
import { dashboardStyles } from '../dashboard.styles';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.html',
})
export class TicketsComponent {
  protected readonly styles = dashboardStyles;
}
