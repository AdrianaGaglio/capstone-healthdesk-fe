import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReminderComponent } from './reminder.component';
import { ButtonsModule } from '../buttons/buttons.module';
import { FormsModule } from '@angular/forms';
import { NgIconsModule } from '@ng-icons/core';
import { AddReminderComponent } from './add-reminder/add-reminder.component';

@NgModule({
  declarations: [ReminderComponent, AddReminderComponent],
  imports: [CommonModule, ButtonsModule, FormsModule, NgIconsModule],
  exports: [ReminderComponent, AddReminderComponent],
})
export class ReminderModule {}
