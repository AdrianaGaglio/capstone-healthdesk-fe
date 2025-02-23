import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {
  constructor(
    private authSvc: AuthService,
    private cookie: CookieService,
    private router: Router
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap((res) => {
        if (res instanceof HttpResponse) {
          const newToken = res.headers.get('Authorization');
          if (newToken) {
            this.cookie.set('auth', newToken, {
              expires: 1, // Durata in giorni
              secure: false, // Cookie trasmesso solo su HTTPS
              sameSite: 'Strict', // Protezione contro attacchi CSRF
              path: '/', // Disponibile in tutto il dominio
            });
          }
        }
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          console.warn('Token scaduto');
          this.authSvc.logout();
          this.router.navigate(['/']);
        }
        return throwError(() => error);
      })
    );
  }
}
