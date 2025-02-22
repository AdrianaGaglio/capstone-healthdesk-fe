import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutRoutingModule } from './about-routing.module';
import { AboutComponent } from './about.component';
import { ContactFormModule } from '../../shared/contact-form/contact-form.module';
import { MapModule } from '../../shared/map/map.module';
import { DoctorAddressModule } from '../../shared/doctor-address/doctor-address.module';
import { DoctorServiceModule } from '../../shared/doctor-service/doctor-service.module';
import { ButtonsModule } from '../../shared/buttons/buttons.module';
import { NgIconsModule } from '@ng-icons/core';

@NgModule({
  declarations: [AboutComponent],
  imports: [
    CommonModule,
    AboutRoutingModule,
    ContactFormModule,
    MapModule,
    DoctorAddressModule,
    DoctorServiceModule,
    ButtonsModule,
    NgIconsModule,
  ],
})
export class AboutModule {}
