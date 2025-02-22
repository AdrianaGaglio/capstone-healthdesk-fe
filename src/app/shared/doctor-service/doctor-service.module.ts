import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorServiceComponent } from './doctor-service.component';
import { ButtonsModule } from '../buttons/buttons.module';

@NgModule({
  declarations: [DoctorServiceComponent],
  imports: [CommonModule, ButtonsModule],
  exports: [DoctorServiceComponent],
})
export class DoctorServiceModule {}
