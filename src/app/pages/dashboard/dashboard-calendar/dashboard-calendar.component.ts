import { Component, OnInit } from '@angular/core';
import { CalendarService } from '../../../services/calendar.service';
import {
  iAppointmentResponseForCalendar,
  iCalendar,
} from '../../../interfaces/icalendar';
import { iAppointment } from '../../../interfaces/iappointment';
import { ManageAppointmentComponent } from '../../../shared/manage-appointment/manage-appointment.component';
import { inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dashboard-calendar',
  templateUrl: './dashboard-calendar.component.html',
  styleUrl: './dashboard-calendar.component.scss',
})
export class DashboardCalendarComponent implements OnInit {
  constructor(private calendarSvc: CalendarService) {}

  private modalService = inject(NgbModal);

  calendar!: iCalendar;
  nextAppointments!: iAppointment[];

  ngOnInit() {
    this.calendarSvc.calendar$.subscribe((calendar) => {
      if (calendar) {
        this.calendar = calendar;
      }
    });
  }

  manageAppointment(
    appointment: iAppointment | iAppointmentResponseForCalendar
  ) {
    this.openModal(appointment as iAppointment)
      .result.then((result) => {
        this.calendarSvc.restoreCalendar();
      })
      .catch((error) => {
        this.modalService.dismissAll(error);
      });
  }

  openModal(appointment: iAppointment) {
    const modalRef = this.modalService.open(ManageAppointmentComponent, {
      size: 'xl',
      centered: true,
    });

    modalRef.componentInstance.appointment = appointment;

    return modalRef;
  }
}
