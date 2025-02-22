import { Injectable } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { catchError, combineLatest, map, of, switchMap, take } from 'rxjs';
import { iPatient } from '../interfaces/ipatientresponse';
import { AppointmentService } from '../services/appointment.service';
import { iAppointment } from '../interfaces/iappointment';

@Injectable({
  providedIn: 'root',
})
export class DetailsGuard implements CanActivate, CanActivateChild {
  constructor(
    private authSvc: AuthService,
    private route: ActivatedRoute,
    private appointmentSvc: AppointmentService,
    private router: Router
  ) {}

  patientId!: number;

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): MaybeAsync<GuardResult> {
    let appId = +route.params['id'];

    return this.authSvc.auth$.pipe(
      take(1),
      switchMap((auth) => {
        if (!auth) {
          console.log('Utente non autenticato, reindirizzamento alla login');

          localStorage.setItem('details', 'true');

          this.router.navigate(['/auth']);
          return of(false);
        }

        if (auth.role !== 'PATIENT') {
          console.log(
            'Utente loggato con ruolo diverso da paziente, può entrare',
            auth
          );
          return of(true); // Permetti l'accesso immediato per ruoli diversi
        }


        return this.appointmentSvc.checkPatient(appId).pipe(
          take(1),
          switchMap((res) => {
            this.patientId = res.patientId;

            return this.authSvc.user$.pipe(
              take(1),
              map((user) => {
                if (!user) {
                  console.log('Utente paziente ma dati non caricati');
                  return false;
                }

                let patient = user as iPatient;

                if (patient.id === this.patientId) {
                  console.log('Proprietario appuntamento, può entrare');
                  return true;
                } else {
                  console.log('Non proprietario appuntamento, accesso negato');
                  return false;
                }
              })
            );
          })
        );
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
