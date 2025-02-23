import { Component, inject } from '@angular/core';
import { DoctorService } from '../../../../services/doctor.service';
import { iDoctor, iService } from '../../../../interfaces/idoctor';
import { DoctorSvcService } from '../../../../services/doctor-svc.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalFeedbackComponent } from '../../../../shared/modalfeedback/modalfeedback.component';

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

  toggleServiceActivation(serviceId: number) {
    this.doctorSrv
      .updateActivation(this.doctor.id, serviceId)
      .subscribe((res) => {
        this.doctorSvc.restoreDoctor();
        this.orderServices();
      });
  }

  toggleServiceAvailability(serviceId: number) {
    this.doctorSrv
      .updateAvailability(this.doctor.id, serviceId)
      .subscribe((res) => {
        this.doctorSvc.restoreDoctor();
        this.orderServices();

        let s = res.services.find((a) => a.id === serviceId);

        let message = s?.online
          ? 'Prestazione ' + s.name + ' impostata come disponibile online!'
          : 'Prestazione ' +
            s!.name +
            ' impostata come disponibile solo in presenza!';

        this.openModal(message);
      });
  }

  deleteService(serviceId: number) {
    this.doctorSrv.deleteService(this.doctor.id, serviceId).subscribe((res) => {
      this.doctorSvc.restoreDoctor();
      this.orderServices();
      this.openModal("Prestazione eliminata correttamente'");
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
}
