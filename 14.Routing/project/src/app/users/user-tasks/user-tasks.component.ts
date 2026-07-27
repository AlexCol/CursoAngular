import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
})
export class UserTasksComponent implements OnInit {
  // forma 1, usnado computed e input
  // private usersService = inject(UsersService);
  // userId = input.required<string>(); //injetado automaticamente pela rota, pois o nome do input é o mesmo do parâmetro da rota (e temos na config withComponentInputBinding)
  // userName = computed(() => this.usersService.users.find((user) => user.id === this.userId())?.name);

  //forma 2, usando o ActivatedRoute para pegar o parâmetro da rota
  private usersService = inject(UsersService);
  private activateRoute = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);
  private _userName = '';
  userName = () => this._userName; //feito assim só pra não precisar mudar o html, caso mude entre forma 1 e 2

  ngOnInit(): void {
    console.log(this.activateRoute);
    const sub = this.activateRoute.params.subscribe((params) => {
      const userId = params['userId'];
      const user = this.usersService.users.find((user) => user.id === userId);
      this._userName = user?.name ?? '';
    });

    this.destroyRef.onDestroy(() => sub.unsubscribe());
  }
}
