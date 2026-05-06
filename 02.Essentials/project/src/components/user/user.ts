import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../models/User';
import { userStyles } from './user.styles';

@Component({
  selector: 'app-user',
  imports: [],
  templateUrl: './user.html',
})
export class UserComponent {
  protected readonly styles = userStyles;

  //! abordagem sem signals
  // @Input({ required: true }) id!: string;
  // @Input({ required: true }) avatar!: string;
  // @Input({ required: true }) name!: string;
  @Input({ required: true }) user!: User;
  @Output() select = new EventEmitter<string>();

  //! abordagem com signals
  //? signals com input são readonly, ou seja, não podem ser alterados dentro do
  //? componente, apenas lidos.
  // id = input.required<string>();
  // avatar = input.required<string>();
  // name = input.required<string>();
  // select = output<string>();

  get imagePath() {
    return `users/${this.user.avatar}`; //sem signals
    //return computed(() => `users/${this.avatar()}`)(); //com signals
  }

  //! METHODS
  public onSelectUser() {
    this.select.emit(this.user.id); //sem signals
    //this.select.emit(this.id());
  }
}
