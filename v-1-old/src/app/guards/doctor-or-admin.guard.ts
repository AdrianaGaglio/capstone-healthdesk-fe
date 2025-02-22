import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  GuardResult,
  MaybeAsync,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { map, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DoctorOrAdminGuard implements CanActivate, CanActivateChild {
  constructor(private authSvc: AuthService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): MaybeAsync<GuardResult> {
    return this.authSvc.auth$.pipe(
      take(1),
      map((auth) => {
        if (auth?.role == 'DOCTOR' || auth?.role == 'ADMIN') {
          console.log('utente medico, può entrare', auth);

          return true;
        } else {
          console.log('utente non medico, non può entrare', auth);
          return false;
        }
      })
    );
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): MaybeAsync<GuardResult> {
    return true;
  }
}
