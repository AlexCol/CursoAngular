import { Component } from '@angular/core';
import { ServerStatus } from '../../../models/types/ServerStatus';
import { dashboardStyles } from '../dashboard.styles';

@Component({
  selector: 'app-server-status',
  templateUrl: './server-status.html',
})
export class ServerStatusComponent {
  protected readonly styles = dashboardStyles;

  currentStatus: ServerStatus = 'online';
}
