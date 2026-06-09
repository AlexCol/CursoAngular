import { Component } from '@angular/core';
import { TrafficData } from '../../../models/types/TrafficData';
import { dashboardStyles } from '../dashboard.styles';

@Component({
  selector: 'app-traffic',
  templateUrl: './traffic.html',
})
export class TrafficComponent {
  protected readonly styles = dashboardStyles;

  dummyTrafficData: TrafficData[] = [
    { id: 'd1', value: 433 },
    { id: 'd2', value: 260 },
    { id: 'd3', value: 290 },
    { id: 'd4', value: 410 },
    { id: 'd5', value: 397 },
    { id: 'd6', value: 488 },
    { id: 'd7', value: 589 },
  ];
  maxTraffic = Math.max(...this.dummyTrafficData.map((data) => data.value));
}
