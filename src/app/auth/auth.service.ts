import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { JwtHelperService } from '@auth0/angular-jwt';
import {
  BehaviorSubject,
  filter,
  map,
  Observable,
  switchMap,
  take,
  tap,
} from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { iAuthResponse } from '../interfaces/iauthresponse';
import { iRegisterRequest } from '../interfaces/iregisterrequest';
import { iLoginRequest } from '../interfaces/iloginrequest';
import { Router } from '@angular/router';
import { iDoctor } from '../interfaces/idoctorresponse';
import { iPatient } from '../interfaces/ipatientresponse';
import { iAuthupdaterequest } from '../interfaces/authupdaterequest';
import { iResetPassword } from '../interfaces/iresetpassword';
import { iMessage } from '../interfaces/imessage';
import { iDoctorRequest } from '../interfaces/idoctorrequest';
import { iDoctorregister } from '../interfaces/idoctorregister';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private cookie: CookieService,
    private router: Router
  ) {
    this.restoreUser();
  }

  url: string = environment.baseUrl + 'auth';
  loginUrl: string = environment.baseUrl + 'auth/login';
  registerUrl: string = environment.baseUrl + 'auth/register';

  auth$ = new BehaviorSubject<iAuthResponse | null>(null);

  isLoggedIn$ = this.auth$.asObservable().pipe(map((auth) => !!auth));

  user$ = new BehaviorSubject<iPatient | iDoctor | null>(null);

  // controlla se ci sono utenti registrati
  count(): Observable<{ configured: boolean }> {
    return this.http.get<{ configured: boolean }>(this.url + '/count').pipe(
      tap((res) => {
        if (!res.configured) this.router.navigate(['/auth/register']);
      })
    );
  }

  // controlla se nel db ci sono i dati
  checkDb(): Observable<{ configured: boolean }> {
    return this.http.get<{ configured: boolean }>(this.url + '/check-db').pipe(
      tap((res) => {
        if (!res.configured) {
          localStorage.setItem('configured', 'false');
          this.isLoggedIn$.subscribe((isLoggedIn) => {
            if (isLoggedIn) {
              this.router.navigate(['/admin']);
            } else {
              this.router.navigate(['/auth']);
            }
          });
        }
      })
    );
  }

  registerUser(newUser: iRegisterRequest): Observable<iPatient> {
    return this.http.post<iPatient>(this.registerUrl, newUser);
  }

  registerDoctor(newDoctor: iDoctorregister): Observable<iDoctor> {
    return this.http.post<iDoctor>(this.url + '/new-doctor', newDoctor);
  }

  registerAdmin(newAdmin: iRegisterRequest): Observable<iMessage> {
    return this.http.post<iMessage>(this.url + '/new-admin', newAdmin);
  }

  login(
    request: iLoginRequest,
    remember: boolean = false
  ): Observable<iAuthResponse> {
    return this.http.post<iAuthResponse>(this.loginUrl, request).pipe(
      tap((auth) => {
        this.setToken(auth, remember);
        this.auth$.next(auth);
      }),
      switchMap((auth) =>
        this.auth$.pipe(
          filter((a) => !!a),
          take(1)
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

  restoreUser() {
    const token = this.cookie.get('token');
    const role = this.cookie.get('role');

    if (!token) return;

    const auth: iAuthResponse = { token: token, role: role };

    this.auth$.next(auth);
  }

  updateLoginInfo(
    updateRequest: iAuthupdaterequest
  ): Observable<iAuthResponse> {
    return this.http
      .put<iAuthResponse>(`${this.url}/update`, updateRequest)
      .pipe(
        tap((auth) => {
          this.setToken(auth);
        })
      );
  }

  setToken(auth: iAuthResponse, remember: boolean = false) {
    const expiration = remember ? 7 : undefined;

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

  resetPasswordAfterFirstAccess(
    reset: iResetPassword
  ): Observable<iAuthResponse> {
    return this.http.post<iAuthResponse>(`${this.url}/new-password`, reset);
  }

  resetRequest(email: string): Observable<iMessage> {
    return this.http.post<iMessage>(
      `${this.url}/reset-request?email=${email}`,
      email
    );
  }
}
