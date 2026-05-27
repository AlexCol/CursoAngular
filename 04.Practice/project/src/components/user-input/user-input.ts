import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { userInputStyles } from './user-input.styles';

@Component({
  imports: [FormsModule],
  selector: 'app-user-input',
  templateUrl: './user-input.html',
})
export class UserInputComponent {
  protected readonly styles = userInputStyles;

  onSubmit() {
    console.log('Form submitted!');
  }
}
