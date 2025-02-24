import { Component, inject, Input } from '@angular/core';
import { iMedicalFolder } from '../../../interfaces/imedicalfolder';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddPrescriptionComponent } from '../add-prescription/add-prescription.component';
import { AuthService } from '../../../auth/auth.service';
import { iPatient } from '../../../interfaces/ipatient';
import { MedicalFolderService } from '../../../services/medical-folder.service';

@Component({
  selector: 'app-prescription',
  templateUrl: './prescription.component.html',
  styleUrl: './prescription.component.scss',
})
export class PrescriptionComponent {
  constructor(
    private authSvc: AuthService,
    private mfSvc: MedicalFolderService
  ) {}

  @Input() mf!: iMedicalFolder;
  @Input() patient!: iPatient;

  isDoctor: boolean = false;

  private modalService = inject(NgbModal);

  ngOnInit() {
    this.authSvc.auth$.subscribe((auth) => {
      if (auth && auth.role === 'DOCTOR') {
        this.isDoctor = true;
      } else {
        this.isDoctor = false;
      }
    });
  }

  addPrescription() {
    const modalRef = this.modalService.open(AddPrescriptionComponent, {
      size: 'lg',
      centered: true,
    });
    modalRef.componentInstance.mf = this.mf;

    modalRef.result
      .then((result) => {
        this.mfSvc.getByPatient(this.patient.id).subscribe((mf) => {
          this.mf = mf;
        });
      })
      .catch((error) => this.modalService.dismissAll(error));
  }

  delete(id: number) {
    this.mfSvc.removePrescription(this.mf.id, id).subscribe((res) => {
      this.mfSvc.getByPatient(this.patient.id).subscribe((mf) => {
        this.mf = mf;
      });
    });
  }
}
