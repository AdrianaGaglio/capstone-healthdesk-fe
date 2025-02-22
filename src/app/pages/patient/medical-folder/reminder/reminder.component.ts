import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import {
  iMedicalFolder,
  iReminder,
} from '../../../../interfaces/imedical-folder';
import { environment } from '../../../../../environments/environment.development';
import { MedicalFolderService } from '../../../../services/medical-folder.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalFeedbackComponent } from '../../../../shared/modal-feedback/modal-feedback.component';

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrl: './reminder.component.scss',
})
export class ReminderComponent {
  constructor(private mfSvc: MedicalFolderService) {}

  @Input() medicalFolder!: iMedicalFolder;

  private modalService = inject(NgbModal);

  add: boolean = false;

  today: string = '';

  @Output() onUpdate = new EventEmitter<iMedicalFolder>();

  ngOnInit() {
    this.today = new Date().toISOString().split('T')[0];
  }

  frequencyTranslation: { eng: string; it: string }[] = environment.frequency;

  reminder: Partial<iReminder> = {};

  setFrequency(freq: string) {
    return this.frequencyTranslation.find((f) => f.eng === freq)?.it;
  }

  addReminder() {
    let request = {
      ...this.reminder,
      medicalFolderId: this.medicalFolder.id,
    };

    console.log(this.reminder);

    this.mfSvc.addReminder(this.medicalFolder.id, request).subscribe((res) => {
      this.add = false;
      this.reminder = {};
      this.onUpdate.emit(res);

      const modalRef = this.modalService.open(ModalFeedbackComponent, {
        size: 'md',
        centered: true,
      });
      modalRef.componentInstance.message = 'Reminder inserito correttamente!';
      modalRef.componentInstance.isError = false;

      setTimeout(() => {
        modalRef.close();
      }, 1000);
    });
  }

  delete(reminderId: number) {
    this.mfSvc
      .removeReminder(this.medicalFolder.id, reminderId)
      .subscribe((res) => {
        this.onUpdate.emit(res);

        const modalRef = this.modalService.open(ModalFeedbackComponent, {
          size: 'md',
          centered: true,
        });
        modalRef.componentInstance.message = 'Reminder rimosso correttamente!';
        modalRef.componentInstance.isError = false;

        setTimeout(() => {
          modalRef.close();
        }, 1000);
      });
  }
}
