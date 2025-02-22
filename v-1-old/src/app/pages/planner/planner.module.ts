import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlannerRoutingModule } from './planner-routing.module';
import { PlannerComponent } from './planner.component';
import { CalendarModule } from '../../shared/calendar/calendar.module';
import { AddBookingModule } from '../../shared/add-booking/add-booking.module';
import { DoctorInfoModule } from '../../shared/doctor-info/doctor-info.module';
import { ButtonsModule } from '../../shared/buttons/buttons.module';
import { DoctorAddressModule } from '../../shared/doctor-address/doctor-address.module';
import { DoctorServiceModule } from '../../shared/doctor-service/doctor-service.module';
import { DoctorCvInfoComponent } from '../../shared/doctor-cv-info/doctor-cv-info.component';
import { DoctorCvInfoModule } from '../../shared/doctor-cv-info/doctor-cv-info.module';
import { NgbActiveModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [PlannerComponent],
  imports: [
    CommonModule,
    PlannerRoutingModule,
    CalendarModule,
    AddBookingModule,
    DoctorInfoModule,
    ButtonsModule,
    DoctorAddressModule,
    DoctorServiceModule,
    DoctorCvInfoModule,
    NgbModalModule,
  ],
  providers: [NgbActiveModal],
})
export class PlannerModule {}
