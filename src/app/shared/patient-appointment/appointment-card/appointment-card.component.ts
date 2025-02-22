import { CommonModule } from '@angular/common';
import { iAppointmentResponseForMF } from './../../../interfaces/imedical-folder';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { AppointmentService } from '../../../services/appointment.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarComponent } from '../../calendar/calendar.component';
import { Calendar } from '@fullcalendar/core/index.js';
import { CalendarService } from '../../../services/calendar.service';
import { iCalendar } from '../../../interfaces/icalendar';
import { ModalFeedbackComponent } from '../../modal-feedback/modal-feedback.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-appointment-card',
  templateUrl: './appointment-card.component.html',
  styleUrl: './appointment-card.component.scss',
})
export class AppointmentCardComponent {
  constructor(
    private appointmentSvc: AppointmentService,
    private calendarSvc: CalendarService,
    private router: Router
  ) {}

  private modalService = inject(NgbModal);

  @Input() appointment!: iAppointmentResponseForMF;

  @Input() isDoctor!: boolean;

  @Output() onCancel = new EventEmitter<iAppointmentResponseForMF>();

  calendar!: iCalendar;

  ngOnInit() {
    this.calendarSvc.getForPatient().subscribe((res) => (this.calendar = res));
    this.router.events.subscribe(() => {
      this.isDoctor = this.router.url.includes('dashboard');
    });
  }

  cancel(id: number) {
    this.appointmentSvc.cancelAppointment(id).subscribe((res) => {
      this.appointment = res;
      this.onCancel.emit(this.appointment);
      const feedback = this.modalService.open(ModalFeedbackComponent, {
        size: 'md',
        centered: true,
      });
      feedback.componentInstance.message =
        'Appuntamento annullato correttamente';
      feedback.componentInstance.isError = false;

      setTimeout(() => {
        this.modalService.dismissAll();
      }, 1000);
    });
  }

  closeModal() {
    this.modalService.dismissAll();
  }

  openCalendar() {
    const modalRef = this.modalService.open(CalendarComponent, {
      size: 'lg',
      scrollable: true,
    });

    modalRef.componentInstance.calendar = this.calendar;
    modalRef.componentInstance.modal = true;
    modalRef.componentInstance.slotMinTime = this.calendar.slotMinTime;
    modalRef.componentInstance.slotMaxTime = this.calendar.slotMaxTime;

    modalRef.result.then((res) => {
      this.appointmentSvc
        .updateDate(this.appointment.id, res.startDate, res.endDate)
        .subscribe((res) => (this.appointment = res));

      const feedback = this.modalService.open(ModalFeedbackComponent, {
        size: 'md',
        centered: true,
      });
      feedback.componentInstance.message =
        'Orario appuntamento modificato correttamente';
      feedback.componentInstance.isError = false;

      setTimeout(() => {
        this.modalService.dismissAll();
      }, 1000);
    });
  }
}
