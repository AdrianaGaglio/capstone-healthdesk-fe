import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppointmentDetailsRoutingModule } from './appointment-details-routing.module';
import { AppointmentDetailsComponent } from './appointment-details.component';


@NgModule({
  declarations: [
    AppointmentDetailsComponent
  ],
  imports: [
    CommonModule,
    AppointmentDetailsRoutingModule
  ]
})
export class AppointmentDetailsModule { }
