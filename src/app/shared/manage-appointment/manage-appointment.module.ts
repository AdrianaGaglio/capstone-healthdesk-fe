import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageAppointmentComponent } from './manage-appointment.component';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ButtonsModule } from '../buttons/buttons.module';

@NgModule({
  declarations: [ManageAppointmentComponent],
  imports: [CommonModule, FormsModule, ButtonsModule],
  exports: [ManageAppointmentComponent],
  providers: [NgbActiveModal],
})
export class ManageAppointmentModule {}
