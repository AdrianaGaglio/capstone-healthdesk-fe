import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorInfoComponent } from './doctor-info.component';
import { NgIconsModule } from '@ng-icons/core';

@NgModule({
  declarations: [DoctorInfoComponent],
  imports: [CommonModule, NgIconsModule],
  exports: [DoctorInfoComponent],
})
export class DoctorInfoModule {}
