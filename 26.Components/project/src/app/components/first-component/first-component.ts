import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-first-component',
  imports: [FormsModule],
  templateUrl: './first-component.html',
  styleUrl: './first-component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FirstComponent {
  interpolation: string = 'This is an interpolation';
  dataBingingStyle: string = 'color: red; font-size: 20px;';
  twoWayBinding: string = 'This is a two-way binding';

  get testeNaoComputado() {
    const rand = Math.random();
    console.log(`Random number generated: ${rand}`);
    return rand;
  }
  testeComputado = computed(() => {
    const rand = Math.random();
    console.log(`Random number generated: ${rand}`);
    return rand;
  });

  onClick() {
    alert('You clicked the button!');
  }

  public submiedValue = signal<string>('');
  onSubmit(form: NgForm) {
    const value = form.value.name;
    this.submiedValue.set(value);
    alert(`Form submitted with value: ${value}`);
  }
}
