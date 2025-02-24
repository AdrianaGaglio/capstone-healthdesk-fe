import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MedicalFolderService } from '../../../../services/medical-folder.service';
import { PatientService } from '../../../../services/patient.service';
import { iPatient } from '../../../../interfaces/ipatient';
import { iMedicalFolder } from '../../../../interfaces/imedicalfolder';
import { combineLatest, forkJoin } from 'rxjs';

@Component({
  selector: 'app-patient-medical-folder',
  templateUrl: './patient-medical-folder.component.html',
  styleUrl: './patient-medical-folder.component.scss',
})
export class PatientMedicalFolderComponent {
  constructor(
    private route: ActivatedRoute,
    private mfSvc: MedicalFolderService,
    private patientSvc: PatientService
  ) {}

  patient!: iPatient;
  mf!: iMedicalFolder;

  ngOnInit() {
    this.route.params.subscribe((params: any) => {
      let id = +params['id'];

      combineLatest([
        this.patientSvc.getById(id),
        this.mfSvc.getByPatient(id),
      ]).subscribe(([patient, mf]) => {
        this.patient = patient;
        this.mf = mf;
      });
    });
  }
}
