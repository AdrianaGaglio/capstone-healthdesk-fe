import { Component, inject, Input } from '@angular/core';
import { iMedicalFolder, iReminder } from '../../../interfaces/imedicalfolder';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UtilitiesService } from '../../../services/utilities.service';
import { environment } from '../../../../environments/environment.development';
import { MedicalFolderService } from '../../../services/medical-folder.service';

@Component({
  selector: 'app-add-reminder',
  templateUrl: './add-reminder.component.html',
  styleUrl: './add-reminder.component.scss',
})
export class AddReminderComponent {
  constructor(
    private utilities: UtilitiesService,
    private mfSvc: MedicalFolderService
  ) {}

  @Input() mf!: iMedicalFolder;
  private activeModal = inject(NgbActiveModal);

  frequencies: { eng: string; it: string }[] = environment.frequency;

  today: string = '';

  reminder: Partial<iReminder> = {};

  ngOnInit() {
    new Date().toISOString().split('T')[0];
  }

  setFrequency(freq: string) {
    return this.utilities.setFrequency(freq);
  }

  addReminder() {
    let request = {
      ...this.reminder,
      medicalFolderId: this.mf.id,
    };

    this.mfSvc.addReminder(this.mf.id, request).subscribe((res) => {
      this.activeModal.close(res);
    });
  }
}
