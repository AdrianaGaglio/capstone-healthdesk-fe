import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { iAppointment } from '../../interfaces/iappointment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  iAppointmentResponseForCalendar,
  iCalendar,
} from '../../interfaces/icalendar';
import { ManageAppointmentComponent } from '../manage-appointment/manage-appointment.component';
import { environment } from '../../../environments/environment.development';
import { MedicalFolderComponent } from '../../pages/patient/medical-folder/medical-folder.component';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-next-appointments',
  templateUrl: './next-appointments.component.html',
  styleUrl: './next-appointments.component.scss',
})
export class NextAppointmentsComponent {
  constructor(private authSvc: AuthService) {}

  @Input() appointment!: iAppointment;

  @Output() updatedAppointment = new EventEmitter<iCalendar>();

  private modalService = inject(NgbModal);

  statuses: { eng: string; it: string }[] = environment.statuses;

  isAdmin: boolean = false;

  ngOnInit() {
    this.authSvc.auth$.subscribe((auth) => {
      if (auth?.role === 'ADMIN') {
        this.isAdmin = true;
      }
    });

    this.setStatus(this.appointment);
  }

  setStatus(app: iAppointmentResponseForCalendar) {
    return this.statuses.find((status) => status.eng === app.status)?.it;
  }

  manageAppointment(app: iAppointmentResponseForCalendar) {
    const modalRef = this.modalService.open(ManageAppointmentComponent, {
      centered: true,
      size: 'lg',
      scrollable: true,
    });
    modalRef.componentInstance.appointment = this.appointment;

    modalRef.result.then((res) => {
      this.updatedAppointment.emit(res);
      setTimeout(() => {
        this.modalService.dismissAll();
      }, 300);
    });
  }

  openPatientFolder(patientId: number, isDoctor: boolean) {
    const modalRef = this.modalService.open(MedicalFolderComponent, {
      size: 'xl',
      centered: true,
      scrollable: true,
      windowClass: 'custom-modal-xl',
    });

    modalRef.componentInstance.isDoctor = isDoctor;
    modalRef.componentInstance.patientId = patientId;
  }
}
