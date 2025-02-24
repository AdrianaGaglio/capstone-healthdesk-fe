import { NotesModule } from './../../shared/notes/notes.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { DashboardCalendarComponent } from './dashboard-calendar/dashboard-calendar.component';
import { PatientsComponent } from './patients/patients.component';
import { SettingsComponent } from './settings/settings.component';
import { AddressesComponent } from './settings/addresses/addresses.component';
import { CalendarSettingsComponent } from './settings/calendar-settings/calendar-settings.component';
import { DetailsComponent } from './settings/details/details.component';
import { PaymentMethodsComponent } from './settings/payment-methods/payment-methods.component';
import { ServicesComponent } from './settings/services/services.component';
import { SettingsControlsComponent } from './settings/settings-controls/settings-controls.component';
import { SidenavModule } from '../../shared/sidenav/sidenav.module';
import { NgIconsModule } from '@ng-icons/core';
import { CalendarModule } from '../../shared/calendar/calendar.module';
import { NextAppointmentsModule } from '../../shared/next-appointments/next-appointments.module';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ButtonsModule } from '../../shared/buttons/buttons.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddServiceComponent } from './settings/services/add-service/add-service.component';
import { ServiceComponent } from './settings/services/service/service.component';
import { AddAddressComponent } from './settings/addresses/add-address/add-address.component';
import { AddressComponent } from './settings/addresses/address/address.component';
import { EditLoginInfoModule } from '../../shared/edit-login-info/edit-login-info.module';
import { SpecializationsComponent } from './settings/details/specializations/specializations.component';
import { TrainingsComponent } from './settings/details/trainings/trainings.component';
import { ExperiencesComponent } from './settings/details/experiences/experiences.component';
import { SpecializationComponent } from './settings/details/specializations/specialization/specialization.component';
import { AddSpecializationComponent } from './settings/details/specializations/add-specialization/add-specialization.component';
import { ExperienceComponent } from './settings/details/experiences/experience/experience.component';
import { AddExperienceComponent } from './settings/details/experiences/add-experience/add-experience.component';
import { AddTrainingComponent } from './settings/details/trainings/add-training/add-training.component';
import { TrainingComponent } from './settings/details/trainings/training/training.component';
import { PatientMedicalFolderComponent } from './patients/patient-medical-folder/patient-medical-folder.component';
import { AddPrescriptionComponent } from '../../shared/load-files/add-prescription/add-prescription.component';
import { LoadFilesModule } from '../../shared/load-files/load-files.module';
import { ReminderModule } from '../../shared/reminder/reminder.module';

@NgModule({
  declarations: [
    DashboardComponent,
    AppointmentsComponent,
    DashboardCalendarComponent,
    PatientsComponent,
    SettingsComponent,
    AddressesComponent,
    CalendarSettingsComponent,
    DetailsComponent,
    PaymentMethodsComponent,
    ServicesComponent,
    SettingsControlsComponent,
    AddServiceComponent,
    ServiceComponent,
    AddAddressComponent,
    AddressComponent,
    SpecializationsComponent,
    TrainingsComponent,
    ExperiencesComponent,
    SpecializationComponent,
    AddSpecializationComponent,
    ExperienceComponent,
    AddExperienceComponent,
    AddTrainingComponent,
    TrainingComponent,
    PatientMedicalFolderComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SidenavModule,
    NgIconsModule,
    CalendarModule,
    NextAppointmentsModule,
    ButtonsModule,
    FormsModule,
    ReactiveFormsModule,
    EditLoginInfoModule,
    LoadFilesModule,
    ReminderModule,
    NotesModule,
  ],
  providers: [NgbActiveModal],
})
export class DashboardModule {}
