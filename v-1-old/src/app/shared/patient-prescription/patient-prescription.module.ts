import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientPrescriptionComponent } from './patient-prescription.component';
import { ButtonsModule } from '../buttons/buttons.module';
import { NgIconsModule } from '@ng-icons/core';
import { PrescriptionCardComponent } from './prescription-card/prescription-card.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [PatientPrescriptionComponent, PrescriptionCardComponent],
  imports: [
    CommonModule,
    ButtonsModule,
    NgIconsModule,
    ButtonsModule,
    FormsModule,
  ],
  exports: [PatientPrescriptionComponent, PrescriptionCardComponent],
})
export class PatientPrescriptionModule {}
