import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  constructor(private breakpointObserver: BreakpointObserver) {}

  getLayoutMax768(): Observable<boolean> {
    return this.breakpointObserver
      .observe(['(max-width: 767px)'])
      .pipe(map((result: BreakpointState) => result.matches));
  }

  getLayoutMax990(): Observable<boolean> {
    return this.breakpointObserver
      .observe(['(max-width: 990px)'])
      .pipe(map((result: BreakpointState) => result.matches));
  }

  getLayoutMax1200(): Observable<boolean> {
    return this.breakpointObserver
      .observe(['(max-width: 1199px)'])
      .pipe(map((result: BreakpointState) => result.matches));
  }
}
