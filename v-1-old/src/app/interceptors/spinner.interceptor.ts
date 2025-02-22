import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { finalize, Observable, tap } from 'rxjs';

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let loader = document.getElementById('loader') as HTMLDivElement;
    if (loader) {
      loader.classList.remove('d-none');
    }

    return next
      .handle(request)
      .pipe(finalize(() => loader.classList.add('d-none')));
  }
}
