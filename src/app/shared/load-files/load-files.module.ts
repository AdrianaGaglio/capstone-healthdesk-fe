import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddDocumentComponent } from './add-document/add-document.component';
import { AddPrescriptionComponent } from './add-prescription/add-prescription.component';
import { NgIconsModule } from '@ng-icons/core';
import { ButtonsModule } from '../buttons/buttons.module';
import { DocumentComponent } from './document/document.component';
import { PrescriptionComponent } from './prescription/prescription.component';

@NgModule({
  declarations: [
    AddDocumentComponent,
    AddPrescriptionComponent,
    DocumentComponent,
    PrescriptionComponent,
  ],
  imports: [CommonModule, FormsModule, NgIconsModule, ButtonsModule],
  exports: [
    AddDocumentComponent,
    AddPrescriptionComponent,
    DocumentComponent,
    PrescriptionComponent,
  ],
})
export class LoadFilesModule {}
