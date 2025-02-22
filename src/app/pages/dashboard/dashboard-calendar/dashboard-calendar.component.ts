import { Component, OnInit } from '@angular/core';
import { CalendarService } from '../../../services/calendar.service';
import {
  iAppointmentResponseForCalendar,
  iCalendar,
} from '../../../interfaces/icalendar';
import { iAppointment } from '../../../interfaces/iappointment';
import { AppointmentService } from '../../../services/appointment.service';
@Component({
  selector: 'app-dashboard-calendar',
  templateUrl: './dashboard-calendar.component.html',
  styleUrl: './dashboard-calendar.component.scss',
})
export class DashboardCalendarComponent implements OnInit {
  constructor(private calendarSvc: CalendarService) {}

  calendar!: iCalendar;
  nextAppointments!: iAppointment[];

  ngOnInit() {
    this.calendarSvc.calendar$.subscribe((calendar) => {
      if (calendar) {
        this.calendar = calendar;
      }
    });
  }

  manageAppointment(appointment: iAppointmentResponseForCalendar) {}
}
