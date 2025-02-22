import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../../auth/auth.service';
import { iDoctor } from '../../../../interfaces/idoctorresponse';
import { DoctorServicesService } from '../../../../services/doctor-services.service';
import { iService } from '../../../../interfaces/iservice';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalFeedbackComponent } from '../../../../shared/modal-feedback/modal-feedback.component';
import { DoctorService } from '../../../../services/doctor.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss',
})
export class ServicesComponent implements OnInit {
  constructor(
    private authSvc: AuthService,
    private doctorServiceSvc: DoctorServicesService,
    private doctorSvc: DoctorService
  ) {}

  private modalService = inject(NgbModal);

  doctor!: iDoctor;
  services!: iService[];

  ngOnInit() {
    this.doctorSvc.doctor$.subscribe((doctor) => {
      if (doctor) {
        this.doctor = doctor;
        this.services = this.doctor.services.sort((a, b) => a.id - b.id);
      }
    });
  }

  toggleServiceAvailability(serviceId: number) {
    this.doctorServiceSvc
      .updateAvailability(this.doctor.id, serviceId)
      .subscribe((res) => {
        this.services = res.services.sort((a, b) => a.id - b.id);

        let s = res.services.find((a) => a.id === serviceId);

        let message = s?.online
          ? 'Prestazione ' + s.name + ' impostata come disponibile online!'
          : 'Prestazione ' +
            s!.name +
            ' impostata come disponibile solo in presenza!';

        this.openModal(message);
      });
  }

  toggleServiceActivation(serviceId: number) {
    this.doctorServiceSvc
      .updateActivation(this.doctor.id, serviceId)
      .subscribe((res) => {
        this.services = res.services.sort((a, b) => a.id - b.id);
      });
  }

  deleteService(serviceId: number) {
    this.doctorServiceSvc
      .deleteService(this.doctor.id, serviceId)
      .subscribe((res) => {
        this.services = res.services.sort((a, b) => a.id - b.id);

        this.openModal("Prestazione eliminata correttamente'");
      });
  }

  updateService(doctor: iDoctor) {
    this.services = doctor.services.sort((a, b) => a.id - b.id);
  }

  openModal(message: string) {
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
