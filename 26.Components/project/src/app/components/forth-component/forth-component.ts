import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChildComponent } from './child/child';

@Component({
  selector: 'app-forth-component',
  templateUrl: './forth-component.html',
  styleUrls: ['./forth-component.css'],
  imports: [FormsModule, ChildComponent],
})
export class ForthComponent {
  public message = signal('Hello, World!');
  public childMessage = signal('');

  onReceivingMessage(newMessage: string) {
    this.childMessage.set(newMessage);
  }
}
