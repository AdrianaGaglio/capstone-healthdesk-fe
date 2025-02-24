import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../auth/auth.service';
import { AppointmentService } from '../../services/appointment.service';
import { CalendarService } from '../../services/calendar.service';
import { iAppointment } from '../../interfaces/iappointment';
import { iCalendar } from '../../interfaces/icalendar';
import { iAddress } from '../../interfaces/iaddress';
import { UtilitiesService } from '../../services/utilities.service';
import { iDoctor } from '../../interfaces/idoctor';
import { DoctorService } from '../../services/doctor.service';
import { ModalFeedbackComponent } from '../../shared/modalfeedback/modalfeedback.component';
import { CalendarComponent } from '../../shared/calendar/calendar.component';

@Component({
  selector: 'app-appointment-details',
  templateUrl: './appointment-details.component.html',
  styleUrl: './appointment-details.component.scss',
})
export class AppointmentDetailsComponent {
  constructor(
    private route: ActivatedRoute,
    private appointmentSvc: AppointmentService,
    private calendarSvc: CalendarService,
    private utilities: UtilitiesService
  ) {}
  private modalService = inject(NgbModal);

  appointment!: iAppointment;
  calendar!: iCalendar;

  doctor!: iDoctor;

  address!: iAddress;

  isPassed: boolean = false;

  getStatus(appointment: iAppointment) {
    return this.utilities.setStatus(appointment);
  }

  getAvatar(user: iDoctor) {
    return this.utilities.getAvatar(user);
  }

  ngOnInit() {
    this.calendarSvc.calendar$.subscribe((calendar) => {
      if (calendar) {
        this.calendar = calendar;
      }
    });

    this.route.params.subscribe((params) => {
      let appId = +params['id'];
      this.appointmentSvc.getById(appId).subscribe((app) => {
        this.appointment = app;
        this.isPassed = new Date(this.appointment.startDate) < new Date();
        console.log(this.isPassed);
        this.doctor = this.appointment.doctor;
      });
    });
  }

  getAddress(address: iAddress): string {
    let stringAddress =
      address.street +
      ',' +
      address.streetNumber +
      ',' +
      address.city +
      ',' +
      address.province +
      ',' +
      address.postalCode;

    return stringAddress.replace(' ', '+');
  }

  confirm(id: number) {
    this.appointmentSvc.confirmAppointment(id).subscribe((res) => {
      this.appointment.status = res.status;
      this.feedback('Appuntamento confermato correttamente');
    });
  }

  cancel(id: number) {
    this.appointmentSvc.cancelAppointment(id).subscribe((res) => {
      this.appointment.status = res.status;
      this.feedback('Appuntamento annullato correttamente');
    });
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

  openCalendar() {
    const modalRef = this.modalService.open(CalendarComponent, {
      size: 'lg',
      scrollable: true,
      centered: true,
    });

    modalRef.componentInstance.calendar = this.calendar;
    modalRef.componentInstance.modal = true;
    modalRef.componentInstance.slotMinTime = this.calendar.slotMinTime;
    modalRef.componentInstance.slotMaxTime = this.calendar.slotMaxTime;

    modalRef.result.then((res) => {
      this.appointmentSvc
        .updateDate(this.appointment.id, res.startDate, res.endDate)
        .subscribe((res) => {
          this.appointment.startDate = res.startDate;
          this.appointment.endDate = res.endDate;
          this.feedback('Appuntamento modificato correttamente');
        });
    });
  }
}
