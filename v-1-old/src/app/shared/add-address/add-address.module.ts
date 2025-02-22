import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddAddressComponent } from './add-address.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgIconsModule } from '@ng-icons/core';
import { ButtonsModule } from '../buttons/buttons.module';

@NgModule({
  declarations: [AddAddressComponent],
  imports: [CommonModule, NgIconsModule, ButtonsModule, ReactiveFormsModule],
  exports: [AddAddressComponent],
})
export class AddAddressModule {}
