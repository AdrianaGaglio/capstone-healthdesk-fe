import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalFeedbackComponent } from './modal-feedback.component';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [ModalFeedbackComponent],
  imports: [CommonModule, FormsModule],
  providers: [NgbActiveModal],
})
export class ModalFeedbackModule {}
