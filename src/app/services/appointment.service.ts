import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { iAppointmentRequest } from '../interfaces/iappointment';
import { Observable, tap } from 'rxjs';
import { iAppointmentResponseForCalendar } from '../interfaces/icalendar';
import { CalendarService } from './calendar.service';
import { iPagedAppointments } from '../interfaces/ipagedappointments';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  constructor(private http: HttpClient, private calendarSvc: CalendarService) {}

  url: string = environment.baseUrl + 'appointments';

  addAppointment(
    newAppointment: iAppointmentRequest
  ): Observable<iAppointmentResponseForCalendar> {
    return this.http
      .post<iAppointmentResponseForCalendar>(this.url, newAppointment)
      .pipe(tap((app) => this.calendarSvc.restoreCalendar()));
  }

  getNextAppointments(
    calendarId: number,
    page: number = 0,
    size: number = 5,
    sort?: string[]
  ): Observable<iPagedAppointments> {
    let url: string = `${this.url}/next/${calendarId}?page=${page}&size=${size}&sort=startDate`;
    if (sort && sort.length > 0) {
      sort.forEach((s) => (url += `&sort=${s}`));
    }

    return this.http.get<iPagedAppointments>(url);
  }
}
