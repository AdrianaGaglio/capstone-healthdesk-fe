import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientRoutingModule } from './patient-routing.module';
import { PatientComponent } from './patient.component';
import { ProfileComponent } from './profile/profile.component';
import { MedicalFolderComponent } from './medical-folder/medical-folder.component';
import { SidenavModule } from '../../shared/sidenav/sidenav.module';
import { AppointmentComponent } from './medical-folder/appointment/appointment.component';
import { NgIconsModule } from '@ng-icons/core';
import { ButtonsModule } from '../../shared/buttons/buttons.module';

import { FormsModule } from '@angular/forms';
import { LoadFilesModule } from '../../shared/load-files/load-files.module';
import { ReminderModule } from '../../shared/reminder/reminder.module';

@NgModule({
  declarations: [
    PatientComponent,
    ProfileComponent,
    MedicalFolderComponent,
    AppointmentComponent,
  ],
  imports: [
    CommonModule,
    PatientRoutingModule,
    SidenavModule,
    NgIconsModule,
    ButtonsModule,
    LoadFilesModule,
    ReminderModule,
  ],
})
export class PatientModule {}
