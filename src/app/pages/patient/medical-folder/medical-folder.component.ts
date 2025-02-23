import { Component } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { iPatient } from '../../../interfaces/ipatient';
import {
  iAppointmentResponseForMF,
  iMedicalFolder,
} from '../../../interfaces/imedicalfolder';
import { MedicalFolderService } from '../../../services/medical-folder.service';
import { filter, switchMap, tap } from 'rxjs';
import { PatientService } from '../../../services/patient.service';

@Component({
  selector: 'app-medical-folder',
  templateUrl: './medical-folder.component.html',
  styleUrl: './medical-folder.component.scss',
})
export class MedicalFolderComponent {
  constructor(
    private authSvc: AuthService,
    private mfSvc: MedicalFolderService,
    private patientSvc: PatientService
  ) {}

  patient!: iPatient;
  mf!: iMedicalFolder;

  nextAppointments!: iAppointmentResponseForMF[];
  showMoreNext: boolean = false;

  cancelled!: iAppointmentResponseForMF[];
  showMoreCancelled: boolean = false;

  completed!: iAppointmentResponseForMF[];
  showMoreCompleted: boolean = false;

  ngOnInit() {
    this.mfSvc.mf$.subscribe((mf) => {
      if (mf) {
        this.mf = mf;
      }
    });

    this.authSvc.user$.subscribe((user) => {
      if (user) {
        this.patient = user as iPatient;
        this.mfSvc.get().subscribe((res) => {
          this.mf = res;
          this.generateLists();
          console.log(this.mf);
        });
      }
    });
  }

  generateLists() {
    if (this.mf) {
      if (this.mf.appointments.some((a) => a.status === 'CANCELLED')) {
        this.cancelled = this.mf.appointments
          .filter((a) => a.status === 'CANCELLED')
          .sort(
            (a, b) =>
              new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
          );
      } else {
        this.cancelled = [];
      }

      if (this.mf.appointments.some((a) => a.status !== 'CANCELLED')) {
        this.completed = this.mf.appointments.filter(
          (a) =>
            new Date(a.startDate).getTime() < Date.now() &&
            a.status !== 'CANCELLED'
        );

        this.mf.appointments = this.mf.appointments
          .sort(
            (a, b) =>
              new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
          )
          .filter((a) => a.status != 'CANCELLED');

        this.nextAppointments = this.mf.appointments
          .filter((a) => new Date(a.startDate).getTime() > Date.now())
          .sort(
            (a, b) =>
              new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
          );
      } else {
        this.completed = [];
        this.nextAppointments = [];
      }
    }
  }
}
