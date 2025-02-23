import { UtilitiesService } from './../../../../services/utilities.service';
import { Component, Input } from '@angular/core';
import { iAppointmentResponseForMF } from '../../../../interfaces/imedicalfolder';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrl: './appointment.component.scss',
})
export class AppointmentComponent {
  constructor(private utilities: UtilitiesService) {}

  @Input() appointment!: iAppointmentResponseForMF;

  getAvatar() {
    return this.utilities.getAvatar(this.appointment.doctor);
  }
}
