import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageAppointmentComponent } from './manage-appointment.component';
import { FormsModule } from '@angular/forms';
import { NgIconsModule } from '@ng-icons/core';
import { ButtonsModule } from '../buttons/buttons.module';
import { FeedbackModule } from '../feedback/feedback.module';

@NgModule({
  declarations: [ManageAppointmentComponent],
  imports: [
    CommonModule,
    NgIconsModule,
    FormsModule,
    ButtonsModule,
    FeedbackModule,
  ],
  exports: [ManageAppointmentComponent],
})
export class ManageAppointmentModule {}
