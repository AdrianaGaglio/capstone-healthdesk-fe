import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactFormComponent } from './contact-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonsModule } from '../buttons/buttons.module';

@NgModule({
  declarations: [ContactFormComponent],
  imports: [CommonModule, ReactiveFormsModule, ButtonsModule],
  exports: [ContactFormComponent],
})
export class ContactFormModule {}
