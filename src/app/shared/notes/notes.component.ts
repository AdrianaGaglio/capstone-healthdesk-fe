import { iRegisterRequest } from './../../interfaces/iregisterrequest';
import { Component, inject, Input } from '@angular/core';
import { iPatient } from '../../interfaces/ipatient';
import { iMedicalFolder } from '../../interfaces/imedicalfolder';
import { MedicalFolderComponent } from '../../pages/patient/medical-folder/medical-folder.component';
import { MedicalFolderService } from '../../services/medical-folder.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddNoteComponent } from './add-note/add-note.component';
import { ModalFeedbackComponent } from '../modalfeedback/modalfeedback.component';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.scss',
})
export class NotesComponent {
  constructor(private mfSvc: MedicalFolderService) {}

  private modalService = inject(NgbModal);

  @Input() patient!: iPatient;
  @Input() mf!: iMedicalFolder;

  addNote() {
    const modalRef = this.modalService.open(AddNoteComponent, {
      size: 'lg',
      centered: true,
    });

    modalRef.componentInstance.mf = this.mf;

    modalRef.result
      .then((res) => {
        if (res) {
          this.mfSvc.getByPatient(this.patient.id).subscribe((mf) => {
            this.mf = mf;
            this.feedback('Nota aggiunta correttamente');
          });
        }
      })
      .catch((error) => this.modalService.dismissAll(error));
  }

  feedback(message: string) {
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

  delete(id: number) {
    this.mfSvc.removeNote(this.mf.id, id).subscribe((mf) => {
      this.mf = mf;
    });
  }
}
