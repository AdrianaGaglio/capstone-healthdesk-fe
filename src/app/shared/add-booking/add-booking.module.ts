import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddBookingComponent } from './add-booking.component';
import { CalendarModule } from '../calendar/calendar.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TabComponent } from './tab/tab.component';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { ButtonsModule } from '../buttons/buttons.module';

@NgModule({
  declarations: [AddBookingComponent, TabComponent],
  imports: [
    CommonModule,
    CalendarModule,
    ReactiveFormsModule,
    NgbNavModule,
    ButtonsModule,
  ],
  exports: [AddBookingComponent, TabComponent],
})
export class AddBookingModule {}
