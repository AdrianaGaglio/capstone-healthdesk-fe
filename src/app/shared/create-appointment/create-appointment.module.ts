import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateAppointmentComponent } from './create-appointment.component';
import { AddBookingModule } from '../add-booking/add-booking.module';
import { CalendarModule } from '../calendar/calendar.module';
import { FormsModule } from '@angular/forms';
import { FeedbackModule } from '../feedback/feedback.module';

@NgModule({
  declarations: [CreateAppointmentComponent],
  imports: [
    CommonModule,
    AddBookingModule,
    CalendarModule,
    FormsModule,
    FeedbackModule,
  ],
  exports: [CreateAppointmentComponent],
})
export class CreateAppointmentModule {}
