import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './sidenav.component';
import { NgIconsModule } from '@ng-icons/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { DirectivesModule } from '../directives/directives.module';
import { DoctorSidenavComponent } from './doctor-sidenav/doctor-sidenav.component';
import { PatientSidenavComponent } from './patient-sidenav/patient-sidenav.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    SidenavComponent,
    DoctorSidenavComponent,
    PatientSidenavComponent,
  ],
  imports: [
    CommonModule,
    NgIconsModule,
    RouterLink,
    RouterLinkActive,
    DirectivesModule,
    NgbDropdownModule,
  ],
  exports: [SidenavComponent, DoctorSidenavComponent, PatientSidenavComponent],
})
export class SidenavModule {}
