import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingsRoutingModule } from './bookings-routing.module';
import { BookingsComponent } from './bookings.component';
import { DoctorInfoComponent } from './doctor-info/doctor-info.component';
import { NgIconsModule } from '@ng-icons/core';
import { ButtonsModule } from '../../shared/buttons/buttons.module';
import { DoctorAddressModule } from '../../shared/doctor-address/doctor-address.module';
import { AddBookingModule } from '../../shared/add-booking/add-booking.module';
import { DoctorServicesComponent } from './doctor-services/doctor-services.component';
import { DoctorCvInfoComponent } from './doctor-cv-info/doctor-cv-info.component';

@NgModule({
  declarations: [BookingsComponent, DoctorInfoComponent, DoctorServicesComponent, DoctorCvInfoComponent],
  imports: [
    CommonModule,
    BookingsRoutingModule,
    NgIconsModule,
    ButtonsModule,
    DoctorAddressModule,
    AddBookingModule,
  ],
})
export class BookingsModule {}
