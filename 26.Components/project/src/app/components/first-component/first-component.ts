import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-first-component',
  imports: [FormsModule],
  templateUrl: './first-component.html',
  styleUrl: './first-component.css',
})
export class FirstComponent {
  interpolation: string = 'This is an interpolation';
  dataBingingStyle: string = 'color: red; font-size: 20px;';
  twoWayBinding: string = 'This is a two-way binding';

  onClick() {
    alert('You clicked the button!');
  }
}
