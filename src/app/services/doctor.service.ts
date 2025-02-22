import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { iDoctor } from '../interfaces/idoctorresponse';
import { AuthService } from '../auth/auth.service';
import { iDoctorUpdateAddInfo } from '../interfaces/idoctorupdateaddinfo';
import { CalendarService } from './calendar.service';

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  constructor(
    private http: HttpClient,
    private authSvc: AuthService,
    private calendarSvc: CalendarService
  ) {
    this.restoreDoctor();
  }

  url: string = environment.baseUrl + 'doctors';

  doctor$ = new BehaviorSubject<iDoctor | null>(null);

  getAll(): Observable<iDoctor[]> {
    return this.http.get<iDoctor[]>(this.url + '/all');
  }

  getDoctor(): Observable<iDoctor> {
    return this.http
      .get<iDoctor>(this.url)
      .pipe(tap((d) => this.doctor$.next(d)));
  }

  getById(id: number): Observable<iDoctor> {
    return this.http
      .get<iDoctor>(`${this.url}/${id}`)
      .pipe(tap((d) => this.doctor$.next(d)));
  }

  updateDoctorInfo(
    doctorId: number,
    request: Partial<iDoctorUpdateAddInfo>
  ): Observable<iDoctor> {
    return this.http.put<iDoctor>(`${this.url}/${doctorId}`, request);
  }

  updatePersonalInfo(id: number, doctor: iDoctor): Observable<iDoctor> {
    return this.http.put<iDoctor>(
      `${this.url}/update-personal-info/${id}`,
      doctor
    );
  }

  restoreDoctor() {
    this.authSvc.auth$.subscribe((auth) => {
      if (!auth || auth.role === 'PATIENT') {
        this.calendarSvc.getForPatient().subscribe((calendar) => {
          this.getById(calendar.doctorId).subscribe();
        });
      } else if (auth.role === 'DOCTOR') {
        this.getDoctor()
          .pipe(tap((doctor) => this.authSvc.user$.next(doctor)))
          .subscribe();
      } else {
        this.getDoctor().subscribe();
      }
    });
  }
}
