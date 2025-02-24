import { Component, inject, Input } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddReminderComponent } from './add-reminder/add-reminder.component';
import { iMedicalFolder } from '../../interfaces/imedicalfolder';
import { iPatient } from '../../interfaces/ipatient';
import { MedicalFolderService } from '../../services/medical-folder.service';
import { ModalFeedbackComponent } from '../modalfeedback/modalfeedback.component';
import { UtilitiesService } from '../../services/utilities.service';

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrl: './reminder.component.scss',
})
export class ReminderComponent {
  constructor(
    private authSvc: AuthService,
    private mfSvc: MedicalFolderService,
    private utilities: UtilitiesService
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

  setFrequency(freq: string) {
    return this.utilities.setFrequency(freq);
  }

  addReminder() {
    const modalRef = this.modalService.open(AddReminderComponent, {
      size: 'lg',
      centered: true,
    });
    modalRef.componentInstance.mf = this.mf;

    modalRef.result
      .then((res) => {
        if (res) {
          this.mf = res;
          this.feedback('Promemoria inserito correttamente');
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
      modalRef.close();
    }, 1000);
  }

  delete(reminderId: number) {
    this.mfSvc.removeReminder(this.mf.id, reminderId).subscribe((res) => {
      this.mf.reminders = this.mf.reminders.filter((r) => r.id !== reminderId);

      this.feedback('Promemoria rimosso correttamente');
    });
  }
}
