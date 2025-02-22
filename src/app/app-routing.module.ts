import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
  },
  { path: 'chi-sono', loadChildren: () => import('./pages/about/about.module').then(m => m.AboutModule) },
  { path: 'contatti', loadChildren: () => import('./pages/contacts/contacts.module').then(m => m.ContactsModule) },
  { path: 'prenota', loadChildren: () => import('./pages/bookings/bookings.module').then(m => m.BookingsModule) },
  { path: 'dashboard', loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: 'paziente', loadChildren: () => import('./pages/patient/patient.module').then(m => m.PatientModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
