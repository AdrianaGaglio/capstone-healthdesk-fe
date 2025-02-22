import { Component, Input } from '@angular/core';
import { iDoctor } from '../../interfaces/idoctorresponse';

@Component({
  selector: 'app-doctor-info',
  templateUrl: './doctor-info.component.html',
  styleUrl: './doctor-info.component.scss',
})
export class DoctorInfoComponent {
  @Input() doctor!: iDoctor;
}
