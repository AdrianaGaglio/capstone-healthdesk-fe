import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorAddressComponent } from './doctor-address.component';
import { NgIconsModule } from '@ng-icons/core';
import { MapModule } from '../map/map.module';

@NgModule({
  declarations: [DoctorAddressComponent],
  imports: [CommonModule, NgIconsModule, MapModule],
  exports: [DoctorAddressComponent],
})
export class DoctorAddressModule {}
