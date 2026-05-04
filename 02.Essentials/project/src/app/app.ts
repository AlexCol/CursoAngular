import { Component } from '@angular/core';
import { HeaderComponent } from '../components/header';
import { DUMMY_USERS } from '../components/user/dummy-users';
import { UserComponent } from '../components/user/user';
import { appStyles } from './app.styles';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, UserComponent],
  templateUrl: './app.html',
  //styleUrls: ['./app.css'],
})
export class App {
  protected readonly styles = appStyles;
  protected users = DUMMY_USERS;

  onSelectUser(id: string) {
    console.log('User selected!', id);
  }
}
