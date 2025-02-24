import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  GuardResult,
  MaybeAsync,
  RouterStateSnapshot,
} from '@angular/router';
import { take, map } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class PatientGuard implements CanActivate, CanActivateChild {
  constructor(private authSvc: AuthService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): MaybeAsync<GuardResult> {
    return this.authSvc.auth$.pipe(
      take(1),
      map((auth) => {
        if (auth?.role == 'PATIENT') {
          console.log('utente paziente, può entrare', auth);
          return true;
        } else {
          console.log('utente non paziente, non può entrare', auth);
          window.history.back();
          return false;
        }
      })
    );
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): MaybeAsync<GuardResult> {
    return this.canActivate(childRoute, state);
  }
}
