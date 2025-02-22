import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MedicalFolderService } from '../../../services/medical-folder.service';
import {
  iAppointmentResponseForMF,
  iDocumentation,
  iMedicalFolder,
} from '../../../interfaces/imedical-folder';
import { AuthService } from '../../../auth/auth.service';
import { iPatient } from '../../../interfaces/ipatientresponse';
import { PatientService } from '../../../services/patient.service';
import { forkJoin, take } from 'rxjs';

@Component({
  selector: 'app-medical-folder',
  templateUrl: './medical-folder.component.html',
  styleUrl: './medical-folder.component.scss',
})
export class MedicalFolderComponent {
  constructor(
    private mfSvc: MedicalFolderService,
    private authSvc: AuthService,
    private patientSvc: PatientService
  ) {}

  medicalFolder!: iMedicalFolder;
  patient!: iPatient;
  nextApps!: iAppointmentResponseForMF[];
  cancelled!: iAppointmentResponseForMF[];
  done!: iAppointmentResponseForMF[];

  @Input() isDoctor!: boolean;
  @Input() patientId!: number;

  ngOnInit() {
    if (this.isDoctor && this.patientId) {
      forkJoin({
        medicalFolder: this.mfSvc.getByPatient(this.patientId),
        patient: this.patientSvc.getById(this.patientId),
      }).subscribe(({ medicalFolder, patient }) => {
        this.medicalFolder = medicalFolder;
        this.patient = patient;
        this.generateLists();
      });
    } else {
      forkJoin({
        patient: this.authSvc.user$.pipe(take(1)), // Prende solo il primo valore
        medicalFolder: this.mfSvc.get(),
      }).subscribe(({ patient, medicalFolder }) => {
        this.patient = patient as iPatient;
        this.medicalFolder = medicalFolder;

        this.generateLists();
      });
    }
  }

  updateMF(mf: iMedicalFolder) {
    this.medicalFolder = mf;
    this.generateLists();
  }

  generateLists() {
    if (this.medicalFolder) {
      if (
        this.medicalFolder.appointments.some((a) => a.status === 'CANCELLED')
      ) {
        this.cancelled = this.medicalFolder.appointments
          .filter((a) => a.status === 'CANCELLED')
          .sort(
            (a, b) =>
              new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
          );
      } else {
        this.cancelled = [];
      }

      if (
        this.medicalFolder.appointments.some((a) => a.status !== 'CANCELLED')
      ) {
        this.done = this.medicalFolder.appointments.filter(
          (a) =>
            new Date(a.startDate).getTime() < Date.now() &&
            a.status !== 'CANCELLED'
        );

        this.medicalFolder.appointments = this.medicalFolder.appointments
          .sort(
            (a, b) =>
              new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
          )
          .filter((a) => a.status != 'CANCELLED');

        this.nextApps = this.medicalFolder.appointments
          .filter((a) => new Date(a.startDate).getTime() > Date.now())
          .sort(
            (a, b) =>
              new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
          );
      } else {
        this.done = [];
        this.nextApps = [];
      }
    }
  }
}
