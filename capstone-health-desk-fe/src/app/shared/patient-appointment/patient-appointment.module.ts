import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientAppointmentComponent } from './patient-appointment.component';
import { NgIconsModule } from '@ng-icons/core';
import { ButtonsModule } from '../buttons/buttons.module';
import { AppointmentCardComponent } from './appointment-card/appointment-card.component';
import { RouterLink } from '@angular/router';

@NgModule({
  declarations: [PatientAppointmentComponent, AppointmentCardComponent],
  imports: [CommonModule, NgIconsModule, ButtonsModule, RouterLink],
  exports: [PatientAppointmentComponent, AppointmentCardComponent],
})
export class PatientAppointmentModule {}
