import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateBookingComponent } from './create-booking.component';
import { AddBookingModule } from '../add-booking/add-booking.module';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarModule } from '../calendar/calendar.module';
import { FormsModule } from '@angular/forms';
import { ButtonsModule } from '../buttons/buttons.module';

@NgModule({
  declarations: [CreateBookingComponent],
  imports: [
    CommonModule,
    AddBookingModule,
    FormsModule,
    CalendarModule,
    ButtonsModule,
  ],
  exports: [CreateBookingComponent],
  providers: [NgbActiveModal],
})
export class CreateBookingModule {}
