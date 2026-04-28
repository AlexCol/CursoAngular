import { Component } from '@angular/core';
import { userStyles } from './user.styles';

@Component({
  selector: 'app-user',
  imports: [],
  templateUrl: './user.html',
})
export class UserComponent {
  protected readonly styles = userStyles;
}
