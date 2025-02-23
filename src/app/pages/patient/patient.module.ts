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
import { PrescriptionComponent } from './medical-folder/prescription/prescription.component';
import { DocumentComponent } from './medical-folder/document/document.component';
import { AddDocumentComponent } from './medical-folder/add-document/add-document.component';
import { AddPrescriptionComponent } from './medical-folder/add-prescription/add-prescription.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PatientComponent,
    ProfileComponent,
    MedicalFolderComponent,
    AppointmentComponent,
    PrescriptionComponent,
    DocumentComponent,
    AddDocumentComponent,
    AddPrescriptionComponent,
  ],
  imports: [
    CommonModule,
    PatientRoutingModule,
    SidenavModule,
    NgIconsModule,
    ButtonsModule,
    FormsModule,
  ],
})
export class PatientModule {}
