import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-child-component',
  templateUrl: './child.html',
  styleUrls: ['./child.css'],
  imports: [FormsModule],
})
export class ChildComponent {
  inputMessage = input.required<string>();
  childOutput = output<string>();

  sendMessage() {
    this.childOutput.emit(this.inputMessage());
  }
}
