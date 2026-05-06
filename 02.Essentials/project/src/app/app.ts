import { Component } from '@angular/core';
import { HeaderComponent } from '../components/header';
import { TasksComponent } from '../components/tasks/tasks';
import { DUMMY_USERS } from '../components/user/dummy-users';
import { UserComponent } from '../components/user/user';
import { User } from '../models/User';
import { appStyles } from './app.styles';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, UserComponent, TasksComponent],
  templateUrl: './app.html',
  //styleUrls: ['./app.css'],
})
export class App {
  protected readonly styles = appStyles;
  protected users = DUMMY_USERS;
  protected selectedUser?: User;

  onSelectUser(id: string) {
    if (this.selectedUser?.id === id) return;

    this.selectedUser = this.users.find((user) => user.id === id) ?? this.selectedUser;
  }
}
