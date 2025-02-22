import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageAppointmentComponent } from './manage-appointment.component';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ButtonsModule } from '../buttons/buttons.module';
import { CalendarModule } from '../calendar/calendar.module';
import { NgIconsModule } from '@ng-icons/core';

@NgModule({
  declarations: [ManageAppointmentComponent],
  imports: [
    CommonModule,
    FormsModule,
    ButtonsModule,
    CalendarModule,
    NgIconsModule,
  ],
  exports: [ManageAppointmentComponent],
  providers: [NgbActiveModal],
})
export class ManageAppointmentModule {}
