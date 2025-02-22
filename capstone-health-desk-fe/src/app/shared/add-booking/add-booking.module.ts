import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddBookingComponent } from './add-booking.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgIconsModule } from '@ng-icons/core';
import { NavTabModule } from '../nav-tab/nav-tab.module';
import { ButtonsModule } from '../buttons/buttons.module';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FeedbackModule } from '../feedback/feedback.module';

@NgModule({
  declarations: [AddBookingComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgIconsModule,
    NavTabModule,
    ButtonsModule,
    NgbModalModule,
    FeedbackModule,
  ],
  exports: [AddBookingComponent],
})
export class AddBookingModule {}
