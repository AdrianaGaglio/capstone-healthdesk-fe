import { Inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { forwardRef } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class ForwardInterceptor implements HttpInterceptor {
  constructor(
    @Inject(forwardRef(() => AuthService)) private authSvc: AuthService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // logica dell'interceptor
    return next.handle(req);
  }
}
