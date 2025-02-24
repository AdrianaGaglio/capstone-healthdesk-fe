import { Component, inject, Input } from '@angular/core';
import { iMedicalFolder } from '../../../interfaces/imedicalfolder';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddDocumentComponent } from '../add-document/add-document.component';
import { AuthService } from '../../../auth/auth.service';
import { MedicalFolderComponent } from '../../../pages/patient/medical-folder/medical-folder.component';
import { MedicalFolderService } from '../../../services/medical-folder.service';
import { iPatient } from '../../../interfaces/ipatient';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrl: './document.component.scss',
})
export class DocumentComponent {
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

  addDocument() {
    const modalRef = this.modalService.open(AddDocumentComponent, {
      size: 'lg',
      centered: true,
    });
    modalRef.componentInstance.mf = this.mf;

    modalRef.result
      .then((result) => {
        this.mfSvc.get().subscribe((mf) => {
          this.mf = mf;
        });
      })
      .catch((error) => this.modalService.dismissAll(error));
  }

  delete(id: number) {
    this.mfSvc.removeCertificate(this.mf.id, id).subscribe((res) => {
      this.mfSvc.get().subscribe((mf) => (this.mf = mf));
    });
  }
}
