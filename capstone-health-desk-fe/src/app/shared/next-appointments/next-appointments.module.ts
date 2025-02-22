import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NextAppointmentsComponent } from './next-appointments.component';
import { ButtonsModule } from '../buttons/buttons.module';

@NgModule({
  declarations: [NextAppointmentsComponent],
  imports: [CommonModule, ButtonsModule],
  exports: [NextAppointmentsComponent],
})
export class NextAppointmentsModule {}
