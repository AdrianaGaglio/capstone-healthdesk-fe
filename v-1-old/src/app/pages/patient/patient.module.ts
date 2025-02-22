import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PazienteRoutingModule } from './patient-routing.module';
import { PatientComponent } from './patient.component';
import { MedicalFolderComponent } from './medical-folder/medical-folder.component';
import { PatientCardModule } from '../../shared/patient-card/patient-card.module';
import { SidenavModule } from '../../shared/sidenav/sidenav.module';
import { ProfileComponent } from './profile/profile.component';
import { ButtonsModule } from '../../shared/buttons/buttons.module';
import { NgIconsModule } from '@ng-icons/core';
import { FormsModule } from '@angular/forms';
import { PatientAppointmentModule } from '../../shared/patient-appointment/patient-appointment.module';
import { PatientPrescriptionModule } from '../../shared/patient-prescription/patient-prescription.module';
import { NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { ReminderComponent } from './medical-folder/reminder/reminder.component';

@NgModule({
  declarations: [PatientComponent, MedicalFolderComponent, ProfileComponent, ReminderComponent],
  imports: [
    CommonModule,
    PazienteRoutingModule,
    PatientCardModule,
    SidenavModule,
    ButtonsModule,
    NgIconsModule,
    FormsModule,
    PatientAppointmentModule,
    PatientPrescriptionModule,
    NgbModalModule,
  ],
})
export class PatientModule {}
