import { Component, Input } from '@angular/core';
import { iPatient } from '../../interfaces/ipatientresponse';

@Component({
  selector: 'app-patient-card',
  templateUrl: './patient-card.component.html',
  styleUrl: './patient-card.component.scss',
})
export class PatientCardComponent {
  @Input() patient!: iPatient;
}
