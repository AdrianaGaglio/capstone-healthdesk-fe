import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [CalendarComponent],
  imports: [CommonModule, FullCalendarModule],
  exports: [CalendarComponent],
  providers: [NgbActiveModal],
})
export class CalendarModule {}
