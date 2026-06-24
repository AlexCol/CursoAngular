import { Component, model } from '@angular/core';

@Component({
  selector: 'app-rect',
  standalone: true,
  imports: [],
  templateUrl: './rect.component.html',
  styleUrl: './rect.component.css',
})
export class RectComponent {
  //forma1 de fazer custom two way binding, com o @Input e @Output,
  // e o mesmo nome do @Input com o sufixo Change no @Output
  // assim pode-se usar com [(size)]="rectSize" no app.component.html
  // @Input({ required: true }) size!: { width: string; height: string };
  // @Output() sizeChange = new EventEmitter<{ width: string; height: string }>();

  //forma2 de fazer custom two way binding, com o model do angular
  //ela usa signals (então para ler usa-se () e para escrever usa-se .set())
  size = model.required<{ width: string; height: string }>();

  onReset() {
    //chamada para a forma1
    // this.sizeChange.emit({
    //   width: '200',
    //   height: '100',
    // });

    //chamada para a forma2
    this.size.set({
      width: '200',
      height: '100',
    });
  }
}
