import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalFeedbackComponent } from '../shared/modalfeedback/modalfeedback.component';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private cookie: CookieService, private authSvc: AuthService) {}
  private modalService = inject(NgbModal);

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((err) => {
        let message = err.error.message;

        if (err.status === 0) {
          message = 'Nessuna risposta dal server.';
          this.cookie.deleteAll();
        } else if (err.status === 403) {
          message = 'Accesso negato';
        } else if (err.status === 500) {
          message = 'Errore nella richiesta.';
        }

        const modalRef = this.modalService.open(ModalFeedbackComponent, {
          size: 'md',
          centered: true,
        });
        modalRef.componentInstance.message = message;

        throw new Error(err.error.message);
      })
    );
  }
}
