import { Component, computed, signal } from '@angular/core';
import { DUMMY_USERS } from './dummy-users';
import { userStyles } from './user.styles';

@Component({
  selector: 'app-user',
  imports: [],
  templateUrl: './user.html',
})
export class UserComponent {
  private currentUserIndex = 1;
  private selectedUser = signal(DUMMY_USERS[this.currentUserIndex]);
  protected readonly styles = userStyles;

  constructor() {}

  //! GETTERS
  get user() {
    return computed(() => this.selectedUser())();
  }
  get userAvatarPath() {
    return `users/${this.user.avatar}`;
  }

  //! METHODS
  public onSelectUser() {}
}

//! com signals
// import { Component, computed, signal } from '@angular/core';
// import { DUMMY_USERS } from './dummy-users';
// import { userStyles } from './user.styles';

// @Component({
//   selector: 'app-user',
//   imports: [],
//   templateUrl: './user.html',
// })
// export class UserComponent {
//   protected readonly styles = userStyles;
//   private currentUserIndex = 0;
//   private selectedUser = signal(DUMMY_USERS[this.currentUserIndex]);
//   public userData = computed(() => this.selectedUser());

//   constructor() {
//     this.selectedUser.set(DUMMY_USERS[this.getRandomIndex()]);
//   }

//   //! GETTERS
//   get userAvatarPath() {
//     return `users/${this.userData().avatar}`;
//   }

//   //! METHODS
//   private getRandomIndex() {
//     let newValue: number;
//     do {
//       newValue = Math.floor(Math.random() * DUMMY_USERS.length);
//     } while (newValue === this.currentUserIndex);
//     this.currentUserIndex = newValue;
//     return newValue;
//   }

//   public onSelectUser() {
//     this.selectedUser.set(DUMMY_USERS[this.getRandomIndex()]);
//   }
// }

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
