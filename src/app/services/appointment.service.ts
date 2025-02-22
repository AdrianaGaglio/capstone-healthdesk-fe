import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { iAppointmentRequest } from '../interfaces/iappointment';
import { Observable, tap } from 'rxjs';
import {
  iAppointmentResponseForCalendar,
  iCalendar,
} from '../interfaces/icalendar';
import { CalendarService } from './calendar.service';
import { iPagedAppointments } from '../interfaces/ipagedappointments';
import { iAppointmentResponseForMF } from '../interfaces/imedicalfolder';
import { iMessage } from '../interfaces/imessage';

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
    size: number = 4,
    sort?: string[]
  ): Observable<iPagedAppointments> {
    let url: string = `${this.url}/next/${calendarId}?page=${page}&size=${size}&sort=startDate`;
    if (sort && sort.length > 0) {
      sort.forEach((s) => (url += `&sort=${s}`));
    }

    return this.http.get<iPagedAppointments>(url);
  }

  updateAppointment(
    appointment: iAppointmentResponseForCalendar
  ): Observable<iCalendar> {
    return this.http.put<iCalendar>(
      `${this.url}/${appointment.id}`,
      appointment
    );
  }

  cancelAppointment(id: number): Observable<iAppointmentResponseForMF> {
    return this.http.put<iAppointmentResponseForMF>(
      `${this.url}/cancel/${id}`,
      id
    );
  }

  confirmAppointment(id: number): Observable<iAppointmentResponseForMF> {
    return this.http.put<iAppointmentResponseForMF>(
      `${this.url}/confirm/${id}`,
      id
    );
  }

  blockSlot(
    blockedSlot: Partial<iAppointmentRequest>
  ): Observable<iAppointmentResponseForCalendar> {
    return this.http.post<iAppointmentResponseForCalendar>(
      `${this.url}/block-slot`,
      blockedSlot
    );
  }

  unlockSlot(id: number): Observable<iMessage> {
    return this.http.post<iMessage>(`${this.url}/unlock-slot?id=${id}`, id);
  }
}
