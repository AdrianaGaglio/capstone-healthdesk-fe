import { MedicalFolderService } from './../../../services/medical-folder.service';
import { Component, inject, Input, ViewChild } from '@angular/core';
import { iMedicalFolder, iNote } from '../../../interfaces/imedicalfolder';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrl: './add-note.component.scss',
})
export class AddNoteComponent {
  constructor(private mfSvc: MedicalFolderService) {}

  @Input() mf!: iMedicalFolder;

  @ViewChild('form') form!: NgForm;

  private activeModal = inject(NgbActiveModal);

  newNote: Partial<iNote> = {};

  addNote() {
    if (this.form.valid) {
      this.mfSvc.addNote(this.mf!.id, this.newNote).subscribe((res) => {
        this.activeModal.close(res);
      });
    }
  }

  close(event: null) {
    this.activeModal.close(event);
  }
}
