import { inject, Injectable } from '@angular/core';
import { CanMatch, CanMatchFn, GuardResult, MaybeAsync, Route, Router, UrlSegment } from '@angular/router';

//! forma com classe 'deprecated'
@Injectable({ providedIn: 'root' })
export class CanMatchGuard implements CanMatch {
  constructor(private readonly router: Router) {}
  canMatch(route: Route, segments: UrlSegment[]): MaybeAsync<GuardResult> {
    //console.log(route);
    //console.log(segments);
    const paramUser = segments[1].toString();
    const blockedUser = 'u2';

    if (paramUser !== blockedUser) {
      return true;
    }
    // return new RedirectCommand(this.router.parseUrl('/**')); //se quiser redicionar
    return false; // se quiser que o proximo nó (irmão desse) seja analisado (no caso desse projeto dá no mesmo, pois o proximo seria o '/**' de qualquer modo)
  }
}

//! forma com function (recomendada)
export const canMatchGuard: CanMatchFn = (route: Route, segments: UrlSegment[]) => {
  const router = inject(Router);

  //console.log(route);
  const paramUser = segments[1].toString();
  const blockedUser = 'u2';

  if (paramUser !== blockedUser) {
    return true;
  }
  //return router.createUrlTree(['/**']); //forma 2 de redirect caso queira redirecionar
  return false;
};
