import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { ButtonsModule } from '../../shared/buttons/buttons.module';
import { DirectivesModule } from '../../shared/directives/directives.module';
import { DoctorAddressModule } from '../../shared/doctor-address/doctor-address.module';
import { NgIconsModule } from '@ng-icons/core';
import { ContactFormModule } from '../../shared/contact-form/contact-form.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ButtonsModule,
    DirectivesModule,
    DoctorAddressModule,
    NgIconsModule,
    ContactFormModule,
  ],
})
export class HomeModule {}
