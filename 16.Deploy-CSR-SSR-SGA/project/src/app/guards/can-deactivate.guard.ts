import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanDeactivate,
  CanDeactivateFn,
  GuardResult,
  MaybeAsync,
  RouterStateSnapshot,
} from '@angular/router';
import { NewTaskComponent } from '../tasks/new-task/new-task.component';

//! forma com classe 'deprecated'
@Injectable({ providedIn: 'root' })
export class CanDeactivateGuard implements CanDeactivate<NewTaskComponent> {
  canDeactivate(
    component: NewTaskComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState: RouterStateSnapshot,
  ): MaybeAsync<GuardResult> {
    if (component.submited) {
      return true;
    }

    if (component.enteredTitle() || component.enteredDate() || component.enteredSummary()) {
      return window.confirm('Do you really want to leave? You will lose the entered data.');
    }

    return true;
  }
}

//! forma com function (recomendada)
export const canDeactivateGuard: CanDeactivateFn<NewTaskComponent> = (
  component: NewTaskComponent,
  currentRoute: ActivatedRouteSnapshot,
  currentState: RouterStateSnapshot,
  nextState: RouterStateSnapshot,
) => {
  if (component.submited) {
    return true;
  }

  if (component.enteredTitle() || component.enteredDate() || component.enteredSummary()) {
    return window.confirm('Do you really want to leave? You will lose the entered data.');
  }

  return true;
};
