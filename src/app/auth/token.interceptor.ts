import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private cookie: CookieService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (this.cookie.get('token') != null) {
      let newRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.cookie.get('token')}`,
        },
      });
      return next.handle(newRequest);
    }

    return next.handle(request);
  }
}
