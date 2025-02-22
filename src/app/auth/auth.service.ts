import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  filter,
  Observable,
  switchMap,
  take,
  tap,
} from 'rxjs';
import { environment } from '../../environments/environment.development';
import { iAuthResponse } from '../interfaces/iauthresponse';
import { CookieService } from 'ngx-cookie-service';
import {
  iAdminRegisterRequest,
  iDoctorRegisterRequest,
  iPatientRegisterRequest,
  iRegisterRequest,
} from '../interfaces/iregisterrequest';
import { iMessage } from '../interfaces/imessage';
import { iLoginRequest } from '../interfaces/iloginrequest';
import { iResetPassword } from '../interfaces/iresetpassword';
import { Router } from '@angular/router';
import { iDoctor } from '../interfaces/idoctor';
import { iPatient } from '../interfaces/ipatient';
import { PatientService } from '../services/patient.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private cookie: CookieService,
    private router: Router,
    private patientSvc: PatientService
  ) {
    this.restoreUser();
  }

  url: string = environment.baseUrl;

  auth$ = new BehaviorSubject<iAuthResponse | null>(null);

  user$ = new BehaviorSubject<iPatient | iDoctor | null>(null);

  registerPatient(newPatient: iPatientRegisterRequest): Observable<iPatient> {
    return this.http.post<iPatient>(this.url + 'auth/register', newPatient);
  }

  registerDoctor(newDoctor: iDoctorRegisterRequest): Observable<iMessage> {
    return this.http.post<iMessage>(this.url + 'auth/new-doctor', newDoctor);
  }

  registerAdmin(newAdmin: iAdminRegisterRequest): Observable<iMessage> {
    return this.http.post<iMessage>(this.url + 'auth/new-admin', newAdmin);
  }

  login(
    loginRequest: iLoginRequest,
    remember: boolean = false
  ): Observable<iAuthResponse> {
    return this.http
      .post<iAuthResponse>(this.url + 'auth/login', loginRequest)
      .pipe(
        tap((auth) => {
          this.setCookie(auth, remember); // salvo i cookie in base alle preferenze
          this.auth$.next(auth); // salvo la risposta nel subject

          const previousPage = localStorage.getItem('details');

          if (previousPage) {
            window.history.back();
          } else {
            switch (auth.role) {
              case 'DOCTOR':
                this.router.navigate(['/dashboard']);
                break;
              case 'PATIENT':
                this.router.navigate(['/paziente']);
                break;
              case 'ADMIN':
                this.router.navigate(['/admin']);
                break;
            }
          }
        }),
        switchMap((auth) =>
          this.auth$.pipe(
            filter((a) => !!a), // se l'auth non e' null
            take(1) // prende il primo valore e completa l'observable
          )
        )
      );
  }

  logout() {
    this.auth$.next(null);
    this.cookie.delete('token', '/');
    this.cookie.delete('role', '/');
    this.cookie.delete('remember', '/');
    this.router.navigate(['/auth']);
  }

  // salvo i dati nei cookie
  setCookie(auth: iAuthResponse, remember: boolean = false) {
    // se remember è true, il cookie viene salvato per 7 giorni
    const expiration = remember ? 7 : undefined;

    // setto i vari cookie con la durata scelta
    this.cookie.set('token', auth.token, {
      expires: expiration, // Durata
      secure: false, // Cookie trasmesso solo su HTTPS
      sameSite: 'Strict', // Protezione contro attacchi CSRF
      path: '/', // Disponibile in tutto il dominio
    });
    this.cookie.set('role', auth.role, {
      expires: expiration,
      secure: false,
      sameSite: 'Strict',
      path: '/',
    });
    this.cookie.set('remember', remember.toString(), {
      expires: expiration,
      secure: false,
      sameSite: 'Strict',
      path: '/',
    });

    this.restoreUser();
  }

  // ripristino l'utente da cookie
  restoreUser() {
    const token = this.cookie.get('token');
    const role = this.cookie.get('role');

    if (!token || !role) return; // interrompe se non ci sono dati salvati nei cookie

    // altrimenti salvo i dati nel subject
    const auth: iAuthResponse = { token: token, role: role };
    this.auth$.next(auth);

    if (auth.role === 'PATIENT') {
      this.patientSvc
        .getPatient()
        .subscribe((patient) => this.user$.next(patient));
    }
  }

  // impostazione nuova password dopo registrazione
  newPassword(resetPassword: iResetPassword): Observable<iAuthResponse> {
    return this.http.post<iAuthResponse>(
      this.url + 'auth/new-password',
      resetPassword
    );
  }

  // richiesta link per modifica password dimenticata
  resetPasswordRequest(email: string): Observable<iMessage> {
    return this.http.post<iMessage>(
      `${this.url}/auth/reset-request?email=${email}`,
      email
    );
  }
}
