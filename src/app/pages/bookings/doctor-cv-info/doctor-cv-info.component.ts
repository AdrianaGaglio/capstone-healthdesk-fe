import { Component, Input } from '@angular/core';
import { iDoctor } from '../../../interfaces/idoctor';

@Component({
  selector: 'app-doctor-cv-info',
  templateUrl: './doctor-cv-info.component.html',
  styleUrl: './doctor-cv-info.component.scss',
})
export class DoctorCvInfoComponent {
  @Input() doctor!: iDoctor;

  show: boolean = false;
}
