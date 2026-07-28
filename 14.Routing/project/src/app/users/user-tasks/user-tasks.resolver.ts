import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { UsersService } from '../users.service';

@Injectable({ providedIn: 'root' })
export class UserNameResolver implements Resolve<string> {
  constructor(private usersService: UsersService) {}
  resolve(activatedRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const userName = this.usersService.users.find((u) => u.id === activatedRoute.paramMap.get('userId'))?.name || '';
    return userName;
  }
}

///criando como função
//criando resolver usado na criação da rota (para não precisar criar a busca do usuário dentro do componente)
//funções 'resolvers' podem usufruir de injeção de dependência, mas não podem usar lifecycle hooks, nem decorators como @Input, @Output, @ViewChild, etc...
export const resolveUserName: ResolveFn<string> = async (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const usersService = inject(UsersService);
  const userId = route.params['userId'];
  const user = usersService.users.find((user) => user.id === userId);
  // console.log('resolveUserName', user?.name);
  return user?.name ?? '';
};
