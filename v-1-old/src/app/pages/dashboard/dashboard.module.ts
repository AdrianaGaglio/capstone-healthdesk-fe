import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { CalendarModule } from '../../shared/calendar/calendar.module';
import { PatientsComponent } from './patients/patients.component';
import { SettingsComponent } from './settings/settings.component';
import { CalendarSettingsComponent } from './settings/calendar-settings/calendar-settings.component';
import { AddressesComponent } from './settings/addresses/addresses.component';
import { ServicesComponent } from './settings/services/services.component';
import { DetailsComponent } from './settings/details/details.component';
import { PaymentMethodsComponent } from './settings/payment-methods/payment-methods.component';
import { SidenavModule } from '../../shared/sidenav/sidenav.module';
import { FormsModule } from '@angular/forms';
import { ButtonsModule } from '../../shared/buttons/buttons.module';
import { NgbActiveModal, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgIconsModule } from '@ng-icons/core';
import { AddServiceModule } from '../../shared/add-service/add-service.module';
import { AddAddressModule } from '../../shared/add-address/add-address.module';

import { NextAppointmentsModule } from '../../shared/next-appointments/next-appointments.module';
import { ManageAppointmentModule } from '../../shared/manage-appointment/manage-appointment.module';
import { CreateAppointmentModule } from '../../shared/create-appointment/create-appointment.module';
import { SpecializationsComponent } from './settings/details/specializations/specializations.component';
import { ExperiencesComponent } from './settings/details/experiences/experiences.component';
import { TrainingsComponent } from './settings/details/trainings/trainings.component';
import { DashboardCalendarComponent } from './dashboard-calendar/dashboard-calendar.component';
import { SettingsControlsComponent } from './settings/settings-controls/settings-controls.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { AppointmentsComponent } from './appointments/appointments.component';
import { DirectivesModule } from '../../shared/directives/directives.module';

@NgModule({
  declarations: [
    DashboardComponent,
    PatientsComponent,
    SettingsComponent,
    CalendarSettingsComponent,
    AddressesComponent,
    ServicesComponent,
    DetailsComponent,
    PaymentMethodsComponent,
    SpecializationsComponent,
    ExperiencesComponent,
    TrainingsComponent,
    DashboardCalendarComponent,
    SettingsControlsComponent,
    AppointmentsComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    CalendarModule,
    SidenavModule,
    FormsModule,
    ButtonsModule,
    NgbDropdownModule,
    NgIconsModule,
    AddServiceModule,
    AddAddressModule,
    NextAppointmentsModule,
    ManageAppointmentModule,
    CreateAppointmentModule,
    ScrollingModule,
    DirectivesModule,
  ],
  providers: [NgbActiveModal],
})
export class DashboardModule {}
