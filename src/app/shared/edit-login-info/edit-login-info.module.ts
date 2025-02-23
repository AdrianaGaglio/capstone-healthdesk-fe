import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditLoginInfoComponent } from './edit-login-info.component';

import { FormsModule } from '@angular/forms';
import { NgIconsModule } from '@ng-icons/core';
import { ButtonsModule } from '../buttons/buttons.module';

@NgModule({
  declarations: [EditLoginInfoComponent],
  imports: [CommonModule, FormsModule, ButtonsModule, NgIconsModule],
  exports: [EditLoginInfoComponent],
})
export class EditLoginInfoModule {}
