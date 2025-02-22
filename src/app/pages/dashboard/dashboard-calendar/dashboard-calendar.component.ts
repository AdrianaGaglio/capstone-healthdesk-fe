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
import { ModalFeedbackComponent } from '../../../shared/modalfeedback/modalfeedback.component';

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

  manageAppointment(appointment: iAppointment) {
    this.openModal(appointment as iAppointment)
      .result.then((result) => {
        this.calendarSvc.restoreCalendar();
        let message: string = '';
        switch (result) {
          case 'update':
            message = 'Appuntamento aggiornato correttamente';
            break;
          case 'cancel':
            message = 'Appuntamento annullato correttamente';
            break;
          case 'confirm':
            message = 'Appuntamento confermato correttamente';
        }
        this.feedback(message);
      })
      .catch((error) => {
        this.modalService.dismissAll(error);
      });
  }

  openModal(appointment: iAppointmentResponseForCalendar) {
    const modalRef = this.modalService.open(ManageAppointmentComponent, {
      size: 'xl',
      centered: true,
      scrollable: true,
    });

    modalRef.componentInstance.appointment = appointment;

    return modalRef;
  }

  feedback(message: string) {
    const modalRef = this.modalService.open(ModalFeedbackComponent, {
      size: 'md',
      centered: true,
    });
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.isError = false;

    setTimeout(() => {
      this.modalService.dismissAll();
    }, 1000);
  }
}
