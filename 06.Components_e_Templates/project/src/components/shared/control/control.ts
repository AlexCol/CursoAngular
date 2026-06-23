import { afterEveryRender, afterNextRender, Component, contentChild, ElementRef, inject, input } from '@angular/core';
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
  //@ContentChild('input') private control?: ElementRef<HTMLInputElement | HTMLTextAreaElement>; //forma 1
  private control = contentChild.required<ElementRef<HTMLInputElement | HTMLTextAreaElement>>('input'); //forma 2 (signal)
  private el = inject(ElementRef);
  protected styles = controlStyles;
  public label = input.required<string>();

  constructor() {
    afterEveryRender(() => {
      //hook executed after every render of the component
      console.log('[Control] afterEveryRender');
    });
    afterNextRender(() => {
      //hook executed after the next render of the component
      console.log('[Control] afterNextRender');
    });
  }

  onClick() {
    console.log('[Control] Start Log clicked!');
    console.log(this.el.nativeElement);
    // console.log(this.control); //lendo controle da forma 1
    console.log(this.control()); //lendo controle da forma 2 (signal)
    console.log('[Control] End Log clicked!');
  }
}
