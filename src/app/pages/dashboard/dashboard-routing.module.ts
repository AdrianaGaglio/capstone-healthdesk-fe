import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { DashboardCalendarComponent } from './dashboard-calendar/dashboard-calendar.component';
import { PatientsComponent } from './patients/patients.component';
import { AddressesComponent } from './settings/addresses/addresses.component';
import { CalendarSettingsComponent } from './settings/calendar-settings/calendar-settings.component';
import { DetailsComponent } from './settings/details/details.component';
import { PaymentMethodsComponent } from './settings/payment-methods/payment-methods.component';
import { ServicesComponent } from './settings/services/services.component';
import { SettingsComponent } from './settings/settings.component';
import { SettingsControlsComponent } from './settings/settings-controls/settings-controls.component';
import { PatientMedicalFolderComponent } from './patients/patient-medical-folder/patient-medical-folder.component';
import { DoctorGuard } from '../../guards/doctor.guard';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        redirectTo: 'calendario',
        pathMatch: 'full',
      },
      {
        path: 'calendario',
        component: DashboardCalendarComponent,
      },
      {
        path: 'pazienti',
        component: PatientsComponent,
        canActivate: [DoctorGuard],
      },
      { path: 'pazienti/mf/:id', component: PatientMedicalFolderComponent },
      {
        path: 'appuntamenti',
        component: AppointmentsComponent,
        canActivate: [DoctorGuard],
      },
      {
        path: 'impostazioni',
        component: SettingsComponent,
        children: [
          {
            path: '',
            component: SettingsControlsComponent,
          },
          {
            path: 'calendario',
            component: CalendarSettingsComponent,
          },
          {
            path: 'indirizzi',
            component: AddressesComponent,
          },
          {
            path: 'servizi',
            component: ServicesComponent,
          },
          {
            path: 'dettagli',
            component: DetailsComponent,
          },
          {
            path: 'metodi-pagamento',
            component: PaymentMethodsComponent,
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
