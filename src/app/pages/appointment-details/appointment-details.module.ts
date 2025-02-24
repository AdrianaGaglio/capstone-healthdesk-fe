import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppointmentDetailsRoutingModule } from './appointment-details-routing.module';
import { AppointmentDetailsComponent } from './appointment-details.component';
import { ButtonsModule } from '../../shared/buttons/buttons.module';
import { MapModule } from '../../shared/map/map.module';
import { NgIconsModule } from '@ng-icons/core';

@NgModule({
  declarations: [AppointmentDetailsComponent],
  imports: [
    CommonModule,
    AppointmentDetailsRoutingModule,
    ButtonsModule,
    MapModule,
    NgIconsModule,
  ],
})
export class AppointmentDetailsModule {}
