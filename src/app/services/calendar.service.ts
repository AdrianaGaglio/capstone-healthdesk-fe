import {
  iActiveDay,
  iActiveDayUpdate,
  iAppointmentResponseForCalendar,
} from './../interfaces/icalendar';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { iCalendar, iTimeSlotRequest } from '../interfaces/icalendar';
import { iHolidayrequest } from '../interfaces/iholidayrequest';
import { iAppointment } from '../interfaces/iappointment';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private authSvc: AuthService
  ) {
    this.restoreCalendar();
  }

  url: string = environment.baseUrl + 'calendar';
  calendar$ = new BehaviorSubject<iCalendar | null>(null);

  getCalendar(): Observable<iCalendar> {
    return this.http.get<iCalendar>(this.url).pipe(
      map((res) => {
        let minAndMax = this.getMinAndMax(res.days, res.appointments);

        return { ...res, ...minAndMax };
      }),
      tap((calendar) => this.calendar$.next(calendar))
    );
  }

  getForPatient(): Observable<iCalendar> {
    return this.http.get<iCalendar>(`${this.url}/for-patient`).pipe(
      map((res) => {
        let minAndMax = this.getMinAndMax(res.days);

        return { ...res, ...minAndMax };
      }),
      tap((calendar) => this.calendar$.next(calendar))
    );
  }

  // getById(id: number): Observable<iCalendar> {
  //   return this.http.get<iCalendar>(`${this.url}/${id}`).pipe(
  //     map((res) => {
  //       let minAndMax = this.getMinAndMax(res.days);
  //       return { ...res, ...minAndMax };
  //     })
  //   );
  // }

  manageDays(
    id: number,
    activeDays: iActiveDayUpdate[]
  ): Observable<iCalendar> {
    return this.http.post<iCalendar>(
      `${this.url}/${id}/manage-days`,
      activeDays
    );
  }

  getAllSlotsSorted(days: iActiveDay[]) {
    let allSlots = days.flatMap((day) => day.slots);
    days.forEach((day) =>
      day.extraRange.forEach((slot) => {
        allSlots.push(slot);
      })
    );

    return allSlots.sort(
      (a, b) =>
        new Date(`1970-01-01T${a.startTime}`).getTime() -
        new Date(`1970-01-01T${b.startTime}`).getTime()
    );
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

  restoreCalendar() {
    this.authSvc.auth$.subscribe((auth) => {
      if (!auth || auth.role === 'PATIENT') {
        this.getForPatient().subscribe();
      } else {
        this.getCalendar().subscribe();
      }
    });
  }
}
