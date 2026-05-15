import { Component } from '@angular/core';
import { cardStyles } from './card.style';

@Component({
  selector: 'app-card',
  imports: [], // Enables Angular template-driven forms and directives like ngModel/ngForm (behaving like the react version of e.preventDefault())
  templateUrl: './card.html',
})
export class CardComponent {
  protected readonly styles = cardStyles;
}
