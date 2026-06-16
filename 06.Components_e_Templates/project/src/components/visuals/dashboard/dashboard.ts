import { Component } from '@angular/core';
import { DashboardItemComponent } from './dashboard-item/dashboard-item';
import { dashboardStyles } from './dashboard.styles';
import { ServerStatusComponent } from './server-status/server-status';
import { TicketsComponent } from './tickets/tickets';
import { TrafficComponent } from './traffic/traffic';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  imports: [ServerStatusComponent, TrafficComponent, TicketsComponent, DashboardItemComponent],
  host: { class: dashboardStyles.dashboard },
})
export class DashboardComponent {
  protected readonly styles = dashboardStyles;
}
