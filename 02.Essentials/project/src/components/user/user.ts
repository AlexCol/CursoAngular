import { Component, EventEmitter, Input, Output } from '@angular/core';
import { userStyles } from './user.styles';

@Component({
  selector: 'app-user',
  imports: [],
  templateUrl: './user.html',
})
export class UserComponent {
  protected readonly styles = userStyles;

  //! abordagem sem signals
  @Input({ required: true }) id!: string;
  @Input({ required: true }) avatar!: string;
  @Input({ required: true }) name!: string;
  @Output() select = new EventEmitter<string>();

  //! abordagem com signals
  //? signals com input são readonly, ou seja, não podem ser alterados dentro do
  //? componente, apenas lidos.
  // id = input.required<string>();
  // avatar = input.required<string>();
  // name = input.required<string>();
  // select = output<string>();

  get imagePath() {
    return `users/${this.avatar}`; //sem signals
    //return computed(() => `users/${this.avatar()}`)(); //com signals
  }

  //! METHODS
  public onSelectUser() {
    this.select.emit(this.id); //sem signals
    //this.select.emit(this.id());
  }
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
