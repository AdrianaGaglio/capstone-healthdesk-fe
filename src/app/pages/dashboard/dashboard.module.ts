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
  ],
  providers: [NgbActiveModal],
})
export class DashboardModule {}
