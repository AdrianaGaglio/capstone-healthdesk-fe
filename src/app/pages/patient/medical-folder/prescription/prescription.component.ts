import { Component, inject, Input } from '@angular/core';
import { iMedicalFolder } from '../../../../interfaces/imedicalfolder';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddPrescriptionComponent } from '../add-prescription/add-prescription.component';

@Component({
  selector: 'app-prescription',
  templateUrl: './prescription.component.html',
  styleUrl: './prescription.component.scss',
})
export class PrescriptionComponent {
  @Input() mf!: iMedicalFolder;

  private modalService = inject(NgbModal);

  addPrescription() {
    const modalRef = this.modalService.open(AddPrescriptionComponent, {
      size: 'lg',
      centered: true,
    });
    modalRef.componentInstance.mf = this.mf;
  }
}
