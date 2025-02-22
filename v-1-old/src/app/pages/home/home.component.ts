import { Component } from '@angular/core';
import { CalendarService } from '../../services/calendar.service';
import { iCalendar } from '../../interfaces/icalendar';
import { AuthService } from '../../auth/auth.service';
import { iDoctor } from '../../interfaces/idoctorresponse';
import { DoctorService } from '../../services/doctor.service';
import { iAddress } from '../../interfaces/iaddressresponse';
import { iAddressForDoctor } from '../../interfaces/iaddressresponsefordoctor';
import { iService } from '../../interfaces/iservice';
import { LayoutService } from '../../services/layout.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(
    private calendarSvc: CalendarService,
    private doctorSvc: DoctorService,
    private layoutSvc: LayoutService
  ) {}

  calendar!: iCalendar;
  doctor!: iDoctor;

  services!: iService[];

  address!: iAddressForDoctor;

  isMobile!: boolean;

  ngOnInit() {
    this.layoutSvc.getLayoutMax768().subscribe((layoutMax) => {
      this.isMobile = layoutMax;
    });

    this.calendarSvc.calendar$.subscribe((calendar) => {
      if (calendar) {
        this.calendar = calendar;
      }
    });
    this.doctorSvc.doctor$.subscribe((doctor) => {
      if (doctor) {
        this.doctor = doctor;
        this.services = doctor.services.filter((s) => s.isActive);
        this.address = doctor.addresses[0];
      }
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
