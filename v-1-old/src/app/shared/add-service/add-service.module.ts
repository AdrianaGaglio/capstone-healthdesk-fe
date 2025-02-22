import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddServiceComponent } from './add-service.component';
import { NgIconsModule } from '@ng-icons/core';
import { ButtonsModule } from '../buttons/buttons.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AddServiceComponent],
  imports: [CommonModule, NgIconsModule, ButtonsModule, ReactiveFormsModule],
  exports: [AddServiceComponent],
})
export class AddServiceModule {}
