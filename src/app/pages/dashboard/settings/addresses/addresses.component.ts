import { Component, inject, Input } from '@angular/core';
import { iDoctor } from '../../../../interfaces/idoctor';
import { DoctorService } from '../../../../services/doctor.service';
import { iAddressForDoctor } from '../../../../interfaces/iaddress';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddAddressComponent } from './add-address/add-address.component';
import { ModalFeedbackComponent } from '../../../../shared/modalfeedback/modalfeedback.component';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrl: './addresses.component.scss',
})
export class AddressesComponent {
  constructor(private doctorSvc: DoctorService) {}

  private modalService = inject(NgbModal);

  doctor!: iDoctor;
  addresses!: iAddressForDoctor[];

  ngOnInit() {
    this.doctorSvc.doctor$.subscribe((doctor) => {
      if (doctor) {
        this.doctor = doctor;
        this.addresses = this.doctor.addresses;
      }
    });
  }

  addAddress() {
    const modalRef = this.modalService.open(AddAddressComponent, {
      size: 'lg',
      centered: true,
    });

    modalRef.componentInstance.doctor = this.doctor;

    modalRef.result
      .then((res) => {
        this.doctorSvc.restoreDoctor();
        if (res) {
          this.openModal('Indirizzo aggiunto correttamente');
        }
      })
      .catch((error) => this.modalService.dismissAll(error));
  }

  openModal(message: string) {
    const modalRef = this.modalService.open(ModalFeedbackComponent, {
      size: 'md',
      centered: true,
    });
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.isError = false;
  }
}
