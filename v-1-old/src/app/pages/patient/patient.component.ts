import { Component, OnInit } from '@angular/core';
import { PatientService } from '../../services/patient.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrl: './patient.component.scss',
})
export class PatientComponent implements OnInit {
  constructor(private patientSvc: PatientService) {}

  ngOnInit() {}
}
