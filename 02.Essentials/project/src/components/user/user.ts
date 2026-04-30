import { Component } from '@angular/core';
import { DUMMY_USERS } from './dummy-users';
import { userStyles } from './user.styles';

@Component({
  selector: 'app-user',
  imports: [],
  templateUrl: './user.html',
})
export class UserComponent {
  protected readonly styles = userStyles;
  private selectedUser = DUMMY_USERS[0];

  constructor() {
    this.selectedUser = DUMMY_USERS[this.getRandomIndex()];
  }

  //! GETTERS
  get userAvatarPath() {
    return `users/${this.selectedUser.avatar}`;
  }

  get userData() {
    return this.selectedUser;
  }

  //! METHODS
  private getRandomIndex() {
    return Math.floor(Math.random() * DUMMY_USERS.length);
  }

  public onSelectUser() {
    this.selectedUser = DUMMY_USERS[this.getRandomIndex()];
  }
}

//! versão sem signal
// import { Component } from '@angular/core';
// import { userStyles } from './user.styles';
// import { DUMMY_USERS } from './dummy-users';

// @Component({
//   selector: 'app-user',
//   imports: [],
//   templateUrl: './user.html',
// })
// export class UserComponent {
//   protected readonly styles = userStyles;
//   private selectedUser = DUMMY_USERS[0]

//   constructor() {
//     this.selectedUser = DUMMY_USERS[this.getRandomIndex()];
//   }

//   //! GETTERS
//   get userAvatarPath() {
//     return `users/${this.selectedUser.avatar}`;
//   }

//   get userData() {
//     return this.selectedUser;
//   }

//   //! METHODS
//   private getRandomIndex() {
//     return Math.floor(Math.random() * DUMMY_USERS.length);
//   }

//   public onSelectUser() {
//     this.selectedUser = DUMMY_USERS[this.getRandomIndex()];
//   }
// }
