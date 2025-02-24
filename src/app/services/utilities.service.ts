import { Observable } from 'rxjs';
import { iDoctor } from './../interfaces/idoctor';
import { iPatient } from './../interfaces/ipatient';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { iAppointmentResponseForCalendar } from '../interfaces/icalendar';
import { iAppointment } from '../interfaces/iappointment';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class UtilitiesService {
  constructor(private authSvc: AuthService) {}

  statuses: { eng: string; it: string }[] = environment.statuses;

  days: { eng: string; it: string }[] = environment.days;

  frequency: { eng: string; it: string }[] = environment.frequency;

  getAvatar(user: iPatient | iDoctor | null): string {
    if (!user) {
      return 'https://ui-avatars.com/api/?name=A';
    } else {
      return user.avatar
        ? user.avatar
        : 'https://ui-avatars.com/api/?name=' + user.name + '+' + user.surname;
    }
  }

  setStatus(app: iAppointmentResponseForCalendar | iAppointment) {
    return this.statuses.find((status) => status.eng === app.status)?.it;
  }

  setDay(day: string) {
    return this.days.find((d) => d.eng === day)?.it;
  }

  setFrequency(freq: string) {
    return this.frequency.find((f) => f.eng === freq)?.it;
  }
}
