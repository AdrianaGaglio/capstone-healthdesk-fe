import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './sidenav.component';
import { ButtonsModule } from '../buttons/buttons.module';
import { DoctorNavComponent } from './doctor-nav/doctor-nav.component';
import { PatientNavComponent } from './patient-nav/patient-nav.component';
import { NgIconsModule } from '@ng-icons/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { DropdownModule } from '../dropdown/dropdown.module';
import { DirectivesModule } from '../directives/directives.module';

@NgModule({
  declarations: [SidenavComponent, DoctorNavComponent, PatientNavComponent],
  imports: [
    CommonModule,
    ButtonsModule,
    NgIconsModule,
    NgbDropdownModule,
    DropdownModule,
    DirectivesModule,
  ],
  exports: [SidenavComponent, DoctorNavComponent, PatientNavComponent],
})
export class SidenavModule {}
