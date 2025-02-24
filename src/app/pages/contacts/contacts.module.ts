import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactsRoutingModule } from './contacts-routing.module';
import { ContactsComponent } from './contacts.component';
import { ContactFormModule } from '../../shared/contact-form/contact-form.module';
import { NgIconsModule } from '@ng-icons/core';
import { DoctorAddressModule } from '../../shared/doctor-address/doctor-address.module';

@NgModule({
  declarations: [ContactsComponent],
  imports: [
    CommonModule,
    ContactsRoutingModule,
    ContactFormModule,
    NgIconsModule,
    DoctorAddressModule,
  ],
})
export class ContactsModule {}
