import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { ButtonsModule } from '../../shared/buttons/buttons.module';
import { FormsModule } from '@angular/forms';
import { DoctorAddressComponent } from '../../shared/doctor-address/doctor-address.component';
import { DoctorAddressModule } from '../../shared/doctor-address/doctor-address.module';
import { NgIconsModule } from '@ng-icons/core';
import { MapModule } from '../../shared/map/map.module';
import { ContactFormModule } from '../../shared/contact-form/contact-form.module';
import { DirectivesModule } from '../../shared/directives/directives.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ButtonsModule,
    FormsModule,
    DoctorAddressModule,
    NgIconsModule,
    MapModule,
    ContactFormModule,
    DirectivesModule,
  ],
})
export class HomeModule {}
