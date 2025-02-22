import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { iAppointment, iAppointmentRequest } from '../interfaces/iappointment';
import {
  iAppointmentResponseForCalendar,
  iCalendar,
} from '../interfaces/icalendar';
import { Observable } from 'rxjs';
import { iAppointmentsPaged } from '../interfaces/iappointmentspaged';
import { iAppointmentResponseForMF } from '../interfaces/imedical-folder';
import { iMessage } from '../interfaces/imessage';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  constructor(private http: HttpClient) {}

  url: string = environment.baseUrl + 'appointments';

  addAppointment(
    newAppointment: Partial<iAppointmentRequest>
  ): Observable<iAppointmentResponseForCalendar> {
    return this.http.post<iAppointmentResponseForCalendar>(
      this.url,
      newAppointment
    );
  }

  getNext(
    calendarId: number,
    page: number = 0,
    size: number = 5,
    sort?: string[]
  ): Observable<iAppointmentsPaged> {
    let url: string = `${this.url}/next/${calendarId}?page=${page}&size=${size}`;
    if (sort && sort.length > 0) {
      sort.forEach((s) => (url += `&sort=${s}`));
    }

    return this.http.get<iAppointmentsPaged>(url);
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

  updateDate(
    id: number,
    startDate: string,
    endDate: string
  ): Observable<iAppointmentResponseForMF> {
    return this.http.put<iAppointmentResponseForMF>(
      `${this.url}/update/${id}`,
      { id: id, startDate: startDate, endDate: endDate }
    );
  }

  getById(id: number): Observable<iAppointment> {
    return this.http.get<iAppointment>(`${this.url}/${id}`);
  }

  checkPatient(id: number): Observable<{ patientId: number }> {
    return this.http.get<{ patientId: number }>(`${this.url}/${id}/check`);
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
