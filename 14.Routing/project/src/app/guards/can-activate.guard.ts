import { inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateFn,
  GuardResult,
  MaybeAsync,
  RedirectCommand,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

//! forma com classe 'deprecated'
@Injectable({ providedIn: 'root' })
export class CanActivateGuard implements CanActivate {
  constructor(private readonly router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    console.log(route);
    const paramUser = route.params['userId'];
    const blockedUser = 'u2';

    if (paramUser !== blockedUser) {
      return true;
    }
    return new RedirectCommand(this.router.parseUrl('/**'));
  }
}

//! forma com function (recomendada)
export const canActivateGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router = inject(Router);

  console.log(route);
  const paramUser = route.params['userId'];
  const blockedUser = 'u2';

  if (paramUser !== blockedUser) {
    return true;
  }
  return router.createUrlTree(['/**']); //forma 2 de redirect
};
