import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientCardComponent } from './patient-card.component';
import { NgIconsModule } from '@ng-icons/core';
import { ButtonsModule } from '../buttons/buttons.module';

@NgModule({
  declarations: [PatientCardComponent],
  imports: [CommonModule, NgIconsModule, ButtonsModule],
  exports: [PatientCardComponent],
})
export class PatientCardModule {}
