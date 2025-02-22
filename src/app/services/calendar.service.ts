import { iCalendar } from './../interfaces/icalendar';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import {
  iActiveDay,
  iActiveDayUpdate,
  iAppointmentResponseForCalendar,
  iCalendarForDoctor,
  iHolidayrequest,
} from '../interfaces/icalendar';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  constructor(private http: HttpClient, private authSvc: AuthService) {
    this.restoreCalendar();
  }

  url: string = environment.baseUrl + 'calendar';

  calendar$ = new BehaviorSubject<iCalendar | iCalendarForDoctor | null>(null);

  getCalendar(): Observable<iCalendarForDoctor> {
    return this.http.get<iCalendarForDoctor>(this.url).pipe(
      map((res) => {
        let minAndMax = this.getMinAndMax(res.days, res.appointments);

        return { ...res, ...minAndMax };
      }),
      tap((calendar) => this.calendar$.next(calendar))
    );
  }

  getById(calendarId: number): Observable<iCalendar> {
    return this.http.get<iCalendar>(`${this.url}/${calendarId}`).pipe(
      map((res) => {
        let minAndMax = this.getMinAndMax(res.days, res.appointments);

        return { ...res, ...minAndMax };
      }),
      tap((calendar) => {
        this.calendar$.next(calendar);
      })
    );
  }

  restoreCalendar() {
    this.authSvc.auth$.subscribe((auth) => {
      if (auth && auth.role === 'DOCTOR') {
        this.getCalendar().subscribe();
      } else {
        this.getById(1).subscribe();
      }
    });
  }

  getMinAndMax(
    days: iActiveDay[],
    appointments?: iAppointmentResponseForCalendar[]
  ) {
    let allSlots = days.flatMap((day) => day.slots);
    days.forEach((day) =>
      day.extraRange.forEach((slot) => {
        allSlots.push(slot);
      })
    );

    // se ci sono appuntamenti (per il medico), aggiungo anche gli slot degli appuntamenti
    // per mostrare la visualizzazione completa al medico
    if (appointments) {
      appointments.forEach((appointment) => {
        let slot = {
          startTime: appointment.startDate.slice(-8),
          endTime: appointment.endDate.slice(-8),
        };
        allSlots.push(slot);
      });
    }

    let slotMinTime = '';
    let slotMaxTime = '';

    if (allSlots.length > 0) {
      allSlots = allSlots.sort(
        (a, b) =>
          new Date(`1970-01-01T${a.startTime}`).getTime() -
          new Date(`1970-01-01T${b.startTime}`).getTime()
      );
      slotMinTime = allSlots[0].startTime;
      slotMaxTime = allSlots[allSlots.length - 1].endTime;
    } else {
      slotMinTime = '08:00:00';
      slotMaxTime = '18:00:00';
    }

    return { slotMinTime: slotMinTime, slotMaxTime: slotMaxTime };
  }

  manageDays(
    id: number,
    activeDays: iActiveDayUpdate[]
  ): Observable<iCalendar> {
    return this.http.post<iCalendar>(
      `${this.url}/${id}/manage-days`,
      activeDays
    );
  }

  changeStatus(id: number, isActive: boolean): Observable<iCalendar> {
    return this.http.put<iCalendar>(
      `${this.url}/${id}/change-status?isActive=${isActive}`,
      isActive
    );
  }

  manageHoliday(
    id: number,
    holidayRequest: iHolidayrequest
  ): Observable<iCalendar> {
    return this.http.put<iCalendar>(
      `${this.url}/${id}/holiday`,
      holidayRequest
    );
  }
}
