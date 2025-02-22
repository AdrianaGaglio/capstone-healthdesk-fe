import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingConfirmationRoutingModule } from './booking-confirmation-routing.module';
import { BookingConfirmationComponent } from './booking-confirmation.component';


@NgModule({
  declarations: [
    BookingConfirmationComponent
  ],
  imports: [
    CommonModule,
    BookingConfirmationRoutingModule
  ]
})
export class BookingConfirmationModule { }
