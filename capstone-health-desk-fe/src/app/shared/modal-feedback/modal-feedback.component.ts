import { Component, inject, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-feedback',
  templateUrl: './modal-feedback.component.html',
  styleUrl: './modal-feedback.component.scss',
})
export class ModalFeedbackComponent {
  private activeModal = inject(NgbActiveModal);

  @Input() message!: string;
  @Input() isError: boolean = true;

  color!: string;

  ngOnInit() {
    if (this.isError) {
      this.color = 'bg-danger text-light';
    } else {
      this.color = 'bg-secondary text-dark fw-bold';
    }
  }
}
