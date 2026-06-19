import { Component, ElementRef, inject, input } from '@angular/core';
import { controlStyles } from './control.styles';

@Component({
  selector: 'app-control',
  templateUrl: './control.html',
  imports: [],
  host: {
    '(click)': 'onClick()',
  },
})
export class ControlComponent {
  private el = inject(ElementRef);
  protected styles = controlStyles;

  label = input.required<string>();

  onClick() {
    //console.log(this.el.nativeElement);
  }
}
