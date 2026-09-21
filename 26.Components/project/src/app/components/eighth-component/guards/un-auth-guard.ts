import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { AuthService } from '../services/login.service';

export const unAuthGuard: CanMatchFn = (
  // route: Route,
  // segments: UrlSegment[],
  // currentSnapshot?: PartialMatchRouteSnapshot,
) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.getToken()) {
    return router.createUrlTree(['/eighth']);
  } else {
    return true;
  }
};
