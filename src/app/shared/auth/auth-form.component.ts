import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrl: './auth-form.component.scss',
})
export class AuthFormComponent {
  private activeModal = inject(NgbActiveModal);

  isRegister: boolean = false;

  @Input() bookingRequest: boolean = false;

  emitPatientId(patientId: number) {
    this.activeModal.close(patientId);
  }
}
