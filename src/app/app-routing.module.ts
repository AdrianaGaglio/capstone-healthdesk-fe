import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorOrAdminGuard } from './guards/doctor-or-admin.guard';
import { PatientGuard } from './guards/patient.guard';
import { GuestGuard } from './guards/guest.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
    canActivate: [GuestGuard],
  },
  {
    path: 'chi-sono',
    loadChildren: () =>
      import('./pages/about/about.module').then((m) => m.AboutModule),
  },
  {
    path: 'contatti',
    loadChildren: () =>
      import('./pages/contacts/contacts.module').then((m) => m.ContactsModule),
  },
  {
    path: 'prenota',
    loadChildren: () =>
      import('./pages/bookings/bookings.module').then((m) => m.BookingsModule),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./pages/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
    canActivate: [DoctorOrAdminGuard],
  },
  {
    path: 'paziente',
    loadChildren: () =>
      import('./pages/patient/patient.module').then((m) => m.PatientModule),
    canActivate: [PatientGuard],
  },
  {
    path: 'dettagli-appuntamento/:id',
    loadChildren: () =>
      import('./pages/appointment-details/appointment-details.module').then(
        (m) => m.AppointmentDetailsModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
