import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorGuard } from './guards/doctor.guard';
import { AdminGuard } from './guards/admin.guard';
import { LoggedInGuard } from './guards/logged-in.guard';
import { GuestGuard } from './guards/guest.guard';
import { PatientGuard } from './guards/patient.guard';
import { DetailsGuard } from './guards/details.guard';
import { DoctorOrAdminGuard } from './guards/doctor-or-admin.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomeModule),
    pathMatch: 'full',
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
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
    canActivate: [GuestGuard],
  },
  {
    path: 'prenota',
    loadChildren: () =>
      import('./pages/planner/planner.module').then((m) => m.PlannerModule),
  },
  {
    path: 'conferma-prenotazione',
    loadChildren: () =>
      import('./pages/booking-confirmation/booking-confirmation.module').then(
        (m) => m.BookingConfirmationModule
      ),
  },
  {
    path: 'cookie-policy',
    loadChildren: () =>
      import('./pages/cookie-policy/cookie-policy.module').then(
        (m) => m.CookiePolicyModule
      ),
  },
  {
    path: 'dettagli-appuntamento/:id',
    loadChildren: () =>
      import('./pages/appointment-details/appointment-details.module').then(
        (m) => m.AppointmentDetailsModule
      ),
    canActivate: [DetailsGuard],
  },
  {
    path: 'dettagli-appuntamento/:id/:details',
    loadChildren: () =>
      import('./pages/appointment-details/appointment-details.module').then(
        (m) => m.AppointmentDetailsModule
      ),
    canActivate: [DetailsGuard],
  },
  {
    path: 'chi-sono',
    loadChildren: () =>
      import('./pages/about/about.module').then((m) => m.AboutModule),
  },
  {
    path: 'contatti',
    loadChildren: () =>
      import('./pages/contact/contact.module').then((m) => m.ContactModule),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./pages/admin-dashboard/admin-dashboard.module').then(
        (m) => m.AdminDashboardModule
      ),
    canActivate: [AdminGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
