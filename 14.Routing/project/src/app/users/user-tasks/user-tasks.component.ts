import { Component, input } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
  imports: [RouterOutlet, RouterLink],
})
export class UserTasksComponent {
  //? recebendo dados da rota
  message = input.required<string>(); //injetado automaticamente pela rota no router, pois o nome do input é o mesmo do parâmetro da rota (e temos na config withComponentInputBinding)

  //? forma 1, usnado computed e input
  // private usersService = inject(UsersService);
  // userId = input.required<string>(); //injetado automaticamente pela rota, pois o nome do input é o mesmo do parâmetro da rota (e temos na config withComponentInputBinding)
  // userName = computed(() => this.usersService.users.find((user) => user.id === this.userId())?.name);

  //? forma 2, usando o ActivatedRoute para pegar o parâmetro da rota
  // private usersService = inject(UsersService);
  // private activateRoute = inject(ActivatedRoute);
  // private destroyRef = inject(DestroyRef);
  // private _userName = '';
  // userName = () => this._userName; //feito assim só pra não precisar mudar o html, caso mude entre forma 1 e 2
  // ngOnInit(): void {
  //   console.log(this.message()); //lendo data vinda da rota

  //   console.log(this.activateRoute);
  //   const sub = this.activateRoute.params.subscribe((params) => {
  //     console.log(params['userId']);
  //     const userId = params['userId'];
  //     const user = this.usersService.users.find((user) => user.id === userId);
  //     this._userName = user?.name ?? '';
  //   });

  //   this.destroyRef.onDestroy(() => sub.unsubscribe());

  //? forma 3, usando snapshot da roda, não gera observables, então não precisa de subscribe
  //? mas no caso desse projeto, não vale o uso, pois o componente não é remontado, então ngOnInit
  //? não é reexecutado, o que vai manter o mesmo userId pra sempre...
  // const snapshot = this.activateRoute.snapshot;
  // console.log(snapshot);
  // const userId = snapshot.params['userId'];
  // const user = this.usersService.users.find((user) => user.id === userId);
  // this._userName = user?.name ?? '';
  // } //* fechamento ngOnInit

  //? forma 4, usando resolver da rota
  userName = input.required<string>();

  //? forma 4.1 pode ser obtido com ActivatedRoute tbm, mesma forma dos params, mas usa a propriedade data do ActivatedRoute, que é um objeto com os dados resolvidos da rota (estaticos e dinamicos)
  // private activateRoute = inject(ActivatedRoute);
  // private destroyRef = inject(DestroyRef);
  // message = signal<string>('');
  // userName = signal<string>('');
  // ngOnInit() {
  //   const sub = this.activateRoute.data.subscribe((data) => {
  //     console.log('data', data);
  //     this.message.set(data['message']);
  //     this.userName.set(data['userName']);
  //   });
  //   this.destroyRef.onDestroy(() => sub.unsubscribe());
  // }
}
