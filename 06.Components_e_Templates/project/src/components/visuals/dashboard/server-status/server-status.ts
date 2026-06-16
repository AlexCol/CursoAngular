import { Component } from '@angular/core';
import { ServerStatus } from '../../../../models/types/ServerStatus';
import { serverStatusStyles } from './server-status.styles';

@Component({
  selector: 'app-server-status',
  templateUrl: './server-status.html',
  host: { class: serverStatusStyles.statusPanel },
})
export class ServerStatusComponent {
  protected readonly styles = serverStatusStyles;

  currentStatus: ServerStatus = 'online';
}
