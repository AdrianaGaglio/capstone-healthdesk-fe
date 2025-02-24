import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutRoutingModule } from './about-routing.module';
import { AboutComponent } from './about.component';
import { NgIconsModule } from '@ng-icons/core';
import { ContactFormModule } from '../../shared/contact-form/contact-form.module';
import { DoctorAddressModule } from '../../shared/doctor-address/doctor-address.module';

@NgModule({
  declarations: [AboutComponent],
  imports: [
    CommonModule,
    AboutRoutingModule,
    NgIconsModule,
    ContactFormModule,
    DoctorAddressModule,
  ],
})
export class AboutModule {}
