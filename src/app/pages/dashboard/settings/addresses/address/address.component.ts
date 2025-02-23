import { Component, inject, Input } from '@angular/core';
import { iAddressForDoctor } from '../../../../../interfaces/iaddress';
import { iDoctor } from '../../../../../interfaces/idoctor';
import { AddressService } from '../../../../../services/address.service';
import { DoctorService } from '../../../../../services/doctor.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalFeedbackComponent } from '../../../../../shared/modalfeedback/modalfeedback.component';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrl: './address.component.scss',
})
export class AddressComponent {
  constructor(
    private addressSvc: AddressService,
    private doctorSvc: DoctorService
  ) {}

  private modalService = inject(NgbModal);

  @Input() address!: iAddressForDoctor;
  @Input() doctor!: iDoctor;

  deleteAddress(id: number) {
    this.addressSvc.deleteDoctorAddress(id).subscribe((res) => {
      this.doctorSvc.restoreDoctor();

      this.openModal('Indirizzo eliminato correttamente');
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
