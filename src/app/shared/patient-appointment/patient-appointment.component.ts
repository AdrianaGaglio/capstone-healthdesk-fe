import { Component, EventEmitter, Input, Output } from '@angular/core';
import { iAppointmentResponseForMF } from '../../interfaces/imedical-folder';

@Component({
  selector: 'app-patient-appointment',
  templateUrl: './patient-appointment.component.html',
  styleUrl: './patient-appointment.component.scss',
})
export class PatientAppointmentComponent {
  @Input() appointments!: iAppointmentResponseForMF[];
  @Input() title!: string;

  @Input() isDoctor!: boolean;

  showMore: boolean = false;

  update(app: iAppointmentResponseForMF) {
    if (this.appointments.every((a) => a.status === 'CANCELLED')) {
      this.appointments.push(app);
      this.appointments = this.appointments.sort(
        (a, b) =>
          new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
      );
    }

    if (
      this.appointments.every(
        (a) =>
          new Date(a.startDate).getTime() > Date.now() &&
          a.status !== 'CANCELLED'
      )
    ) {
      this.appointments = this.appointments.filter((a) => a.id != app.id);
    }
  }

  ngOnChanges() {
    this.getLenght();
  }

  getLenght() {
    return this.appointments.length;
  }
}
