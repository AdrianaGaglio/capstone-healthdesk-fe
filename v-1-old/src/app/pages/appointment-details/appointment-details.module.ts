import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppointmentDetailsRoutingModule } from './appointment-details-routing.module';
import { AppointmentDetailsComponent } from './appointment-details.component';
import { SidenavComponent } from '../../shared/sidenav/sidenav.component';
import { SidenavModule } from '../../shared/sidenav/sidenav.module';
import { ButtonsModule } from '../../shared/buttons/buttons.module';
import { NgIconsModule } from '@ng-icons/core';
import { MapModule } from '../../shared/map/map.module';
import { NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [AppointmentDetailsComponent],
  imports: [
    CommonModule,
    AppointmentDetailsRoutingModule,
    SidenavModule,
    ButtonsModule,
    NgIconsModule,
    MapModule,
  ],
})
export class AppointmentDetailsModule {}
