import { iPrescription } from './../../../interfaces/imedical-folder';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  iDocumentation,
  iMedicalFolder,
} from '../../../interfaces/imedical-folder';
import { MedicalFolderService } from '../../../services/medical-folder.service';

@Component({
  selector: 'app-prescription-card',
  templateUrl: './prescription-card.component.html',
  styleUrl: './prescription-card.component.scss',
})
export class PrescriptionCardComponent {
  constructor(private mfSvc: MedicalFolderService) {}

  @Input() documentation!: iPrescription | iDocumentation;
  @Input() mfID!: number;
  @Input() isDoctor!: boolean;

  @Output() onDelete = new EventEmitter<iMedicalFolder>();

  isPrescription: boolean = false;
  @Input() isPatient!: boolean;

  delete(id: number) {
    if (this.isDoctor) {
      this.mfSvc
        .removePrescription(this.mfID, id)
        .subscribe((res) => this.onDelete.emit(res));
    } else {
      this.mfSvc
        .removeCertificate(this.mfID, id)
        .subscribe((res) => this.onDelete.emit(res));
    }
  }
}
