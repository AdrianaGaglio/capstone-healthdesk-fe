import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppointmentService } from '../../services/appointment.service';
import { iAppointment } from '../../interfaces/iappointment';
import { environment } from '../../../environments/environment.development';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarComponent } from '../../shared/calendar/calendar.component';
import { iCalendar } from '../../interfaces/icalendar';
import { AuthService } from '../../auth/auth.service';
import { CalendarService } from '../../services/calendar.service';
import { ModalFeedbackComponent } from '../../shared/modal-feedback/modal-feedback.component';
import { iAddress } from '../../interfaces/iaddressresponse';
import { ManageAppointmentComponent } from '../../shared/manage-appointment/manage-appointment.component';

@Component({
  selector: 'app-appointment-details',
  templateUrl: './appointment-details.component.html',
  styleUrl: './appointment-details.component.scss',
})
export class AppointmentDetailsComponent {
  constructor(
    private route: ActivatedRoute,
    private appointmentSvc: AppointmentService,
    private authSvc: AuthService,
    private calendarSvc: CalendarService
  ) {}
  private modalService = inject(NgbModal);

  appointment!: iAppointment;
  calendar!: iCalendar;

  address!: string;

  isDoctor!: boolean;

  statuses: { eng: string; it: string }[] = environment.statuses;

  translateStatus(status: string) {
    return this.statuses.find((s) => s.eng === status)?.it;
  }

  ngOnInit() {
    this.authSvc.auth$.subscribe((auth) => {
      if (auth) {
        if (auth.role === 'DOCTOR') {
          this.calendarSvc.getCalendar().subscribe((calendar) => {
            this.calendar = calendar;
            this.isDoctor = true;
          });
        } else {
          this.calendarSvc
            .getForPatient()
            .subscribe((calendar) => (this.calendar = calendar));
        }
      }
    });

    this.route.params.subscribe((params: any) => {
      let appId = +params['id'];
      this.appointmentSvc.getById(appId).subscribe((res) => {
        this.appointment = res;
        this.getAddress(this.appointment.address);
      });
    });
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
        .subscribe((res) => {
          this.appointment.startDate = res.startDate;
          this.appointment.endDate = res.endDate;
          const modalRef = this.modalService.open(ModalFeedbackComponent, {
            size: 'md',
            centered: true,
          });
          modalRef.componentInstance.message =
            'Appuntamento modificato correttamente';
          modalRef.componentInstance.isError = false;

          setTimeout(() => {
            this.modalService.dismissAll();
          }, 1000);
        });
    });
  }

  getAddress(address: iAddress) {
    if (address) {
      let addressString =
        address.street +
        ',' +
        address.streetNumber +
        ',' +
        address.city +
        ',' +
        address.provinceAcronym +
        ',' +
        address.postalCode;

      return addressString.replace(' ', '+');
    } else {
      return '';
    }
  }

  cancel(id: number) {
    this.appointmentSvc.cancelAppointment(id).subscribe((res) => {
      this.appointment.status = res.status;
      const modalRef = this.modalService.open(ModalFeedbackComponent, {
        size: 'md',
        centered: true,
      });

      modalRef.componentInstance.message =
        'Appuntamento annullato correttamente';
      modalRef.componentInstance.isError = false;

      setTimeout(() => {
        this.modalService.dismissAll();
      }, 1000);
    });
  }

  confirm(id: number) {
    this.appointmentSvc.confirmAppointment(id).subscribe((res) => {
      this.appointment.status = res.status;
      const modalRef = this.modalService.open(ModalFeedbackComponent, {
        size: 'md',
        centered: true,
      });

      modalRef.componentInstance.message =
        'Appuntamento confermato correttamente';
      modalRef.componentInstance.isError = false;
      setTimeout(() => {
        this.modalService.dismissAll();
      }, 1000);
    });
  }
}
