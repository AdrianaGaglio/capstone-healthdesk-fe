import { Calendar } from '@fullcalendar/core/index.js';
import { Component } from '@angular/core';
import { iDoctor } from '../../interfaces/idoctorresponse';
import { CalendarService } from '../../services/calendar.service';
import { AuthService } from '../../auth/auth.service';
import { DoctorService } from '../../services/doctor.service';
import { iCalendar } from '../../interfaces/icalendar';
import { iAddressForDoctor } from '../../interfaces/iaddressresponsefordoctor';
import { iAddress } from '../../interfaces/iaddressresponse';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {
  constructor(
    private calendarSvc: CalendarService,
    private authSvc: AuthService,
    private doctorSvc: DoctorService
  ) {}

  calendar!: iCalendar;
  doctor!: iDoctor;

  address!: iAddressForDoctor;

  ngOnInit() {
    this.calendarSvc.calendar$.subscribe((calendar) => {
      this.calendar = calendar!;
    });
    this.doctorSvc.doctor$.subscribe((doctor) => {
      this.doctor = doctor!;
      this.address = this.doctor.addresses[0];
    });
  }

  getAddress(address: iAddressForDoctor) {
    let string =
      address.address.street +
      ',' +
      address.address.streetNumber +
      ',' +
      address.address.city +
      ',' +
      address.address.provinceAcronym +
      ',' +
      address.address.postalCode;
    return string.replace(' ', '+');
  }
}
