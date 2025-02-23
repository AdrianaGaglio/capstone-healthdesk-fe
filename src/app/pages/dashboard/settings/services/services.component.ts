import { Component, inject } from '@angular/core';
import { DoctorService } from '../../../../services/doctor.service';
import { iDoctor, iService } from '../../../../interfaces/idoctor';
import { DoctorSvcService } from '../../../../services/doctor-svc.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalFeedbackComponent } from '../../../../shared/modalfeedback/modalfeedback.component';
import { AddServiceComponent } from './add-service/add-service.component';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss',
})
export class ServicesComponent {
  constructor(
    private doctorSvc: DoctorService,
    private doctorSrv: DoctorSvcService
  ) {}

  doctor!: iDoctor;
  services!: iService[];

  private modalService = inject(NgbModal);

  ngOnInit() {
    this.doctorSvc.doctor$.subscribe((doctor) => {
      if (doctor) {
        this.doctor = doctor;
      }
    });
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

  orderServices() {
    this.services = this.services.sort((a, b) => a.id - b.id);
  }

  addService() {
    const modalRef = this.modalService.open(AddServiceComponent, {
      size: 'lg',
      centered: true,
    });

    modalRef.componentInstance.doctor = this.doctor;

    modalRef.result.then((res) => {
      this.doctorSvc.restoreDoctor();
      if (res) {
        this.openModal('Prestazione inserita correttamente');
      }
    });
  }
}
