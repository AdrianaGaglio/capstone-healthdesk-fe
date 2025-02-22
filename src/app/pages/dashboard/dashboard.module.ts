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
import { RouterModule } from '@angular/router';
import { SettingsControlsComponent } from './settings/settings-controls/settings-controls.component';
import { SidenavModule } from '../../shared/sidenav/sidenav.module';
import { NgIconsModule } from '@ng-icons/core';
import { CalendarModule } from '../../shared/calendar/calendar.module';
import { NextAppointmentsModule } from '../../shared/next-appointments/next-appointments.module';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

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
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SidenavModule,
    NgIconsModule,
    CalendarModule,
    NextAppointmentsModule,
  ],
  providers: [NgbActiveModal],
})
export class DashboardModule {}
