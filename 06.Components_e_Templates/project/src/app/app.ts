import { Component } from '@angular/core';
import { HeaderComponent } from '../components/header/header';
import { appStyles } from './app.styles';

type ServerStatus = 'online' | 'offline' | 'unknown';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent],
  templateUrl: './app.html',
})
export class App {
  protected readonly styles = appStyles;

  dummyTrafficData = [
    { id: 'd1', value: 433 },
    { id: 'd2', value: 260 },
    { id: 'd3', value: 290 },
    { id: 'd4', value: 410 },
    { id: 'd5', value: 397 },
    { id: 'd6', value: 488 },
    { id: 'd7', value: 589 },
  ];
  maxTraffic = Math.max(...this.dummyTrafficData.map((data) => data.value));
  currentStatus: ServerStatus = 'online';
}
