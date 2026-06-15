import { Component, input } from '@angular/core';
import { controlStyles } from './control.styles';

@Component({
  selector: 'app-control',
  templateUrl: './control.html',
  imports: [],
})
export class ControlComponent {
  protected styles = controlStyles;

  label = input.required<string>();
}
