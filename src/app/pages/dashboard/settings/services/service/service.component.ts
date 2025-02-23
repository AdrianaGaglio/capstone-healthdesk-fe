import { Component, inject, Input } from '@angular/core';
import { iDoctor, iService } from '../../../../../interfaces/idoctor';
import { DoctorSvcService } from '../../../../../services/doctor-svc.service';
import { DoctorService } from '../../../../../services/doctor.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalFeedbackComponent } from '../../../../../shared/modalfeedback/modalfeedback.component';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrl: './service.component.scss',
})
export class ServiceComponent {
  constructor(
    private doctorSrv: DoctorSvcService,
    private doctorSvc: DoctorService
  ) {}

  private modalService = inject(NgbModal);

  @Input() service!: iService;
  @Input() doctor!: iDoctor;

  edit: boolean = false;

  update(service: iService) {
    this.doctorSrv.update(service).subscribe((res) => {
      this.edit = false;
      this.openModal('Prestazione aggiornata correttamente');
    });
  }

  toggleServiceActivation(serviceId: number) {
    this.doctorSrv
      .updateActivation(this.doctor.id, serviceId)
      .subscribe((res) => {
        this.doctorSvc.restoreDoctor();
      });
  }

  toggleServiceAvailability(serviceId: number) {
    this.doctorSrv
      .updateAvailability(this.doctor.id, serviceId)
      .subscribe((res) => {
        this.doctorSvc.restoreDoctor();

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
}
