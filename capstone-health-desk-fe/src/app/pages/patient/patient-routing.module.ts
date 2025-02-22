import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientComponent } from './patient.component';
import { MedicalFolderComponent } from './medical-folder/medical-folder.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component: PatientComponent,
    children: [
      {
        path: '',
        redirectTo: 'scheda-personale',
        pathMatch: 'full',
      },
      {
        path: 'scheda-personale',
        component: MedicalFolderComponent,
      },
      {
        path: 'profilo',
        component: ProfileComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PazienteRoutingModule {}
