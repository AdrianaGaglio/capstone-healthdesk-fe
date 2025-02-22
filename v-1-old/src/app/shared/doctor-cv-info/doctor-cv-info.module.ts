import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorCvInfoComponent } from './doctor-cv-info.component';
import { NgIconsModule } from '@ng-icons/core';
import { ButtonsModule } from '../buttons/buttons.module';

@NgModule({
  declarations: [DoctorCvInfoComponent],
  imports: [CommonModule, NgIconsModule, ButtonsModule],
  exports: [DoctorCvInfoComponent],
})
export class DoctorCvInfoModule {}
