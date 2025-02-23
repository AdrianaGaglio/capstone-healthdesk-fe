import { Component, inject, Input } from '@angular/core';
import { iMedicalFolder } from '../../../../interfaces/imedicalfolder';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddPrescriptionComponent } from '../add-prescription/add-prescription.component';
import { AddDocumentComponent } from '../add-document/add-document.component';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrl: './document.component.scss',
})
export class DocumentComponent {
  @Input() mf!: iMedicalFolder;

  private modalService = inject(NgbModal);

  addDocument() {
    const modalRef = this.modalService.open(AddDocumentComponent, {
      size: 'lg',
      centered: true,
    });
    modalRef.componentInstance.mf = this.mf;
  }
}
