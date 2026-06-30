import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appLog]',
  host: {
    '(click)': 'onLog()',
  },
})
export class LogDirective {
  constructor(private elementRef: ElementRef) {}

  onLog() {
    console.log('LogDirective: Element clicked!');
    console.log('Element:', this.elementRef.nativeElement);
  }
}
