import { iRegisterRequest } from './../../interfaces/iregisterrequest';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalFeedbackComponent } from '../../shared/modal-feedback/modal-feedback.component';

@Component({
  selector: 'app-reset-request',
  templateUrl: './reset-request.component.html',
  styleUrl: './reset-request.component.scss',
})
export class ResetRequestComponent {
  constructor(private fb: FormBuilder, private authSvc: AuthService) {}

  private modalService = inject(NgbModal);

  resetRequest!: FormGroup;
  firstAccess: boolean = false;

  showPassword: boolean = false;

  ngOnInit() {
    this.resetRequest = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
    });
  }

  isTouchedInvalid(field: string) {
    return (
      this.resetRequest.get(field)?.touched &&
      this.resetRequest.get(field)?.invalid
    );
  }

  getMessage(field: string) {
    if (this.resetRequest.get(field)?.hasError('email')) {
      return 'Email non valida';
    } else {
      return 'Campo richiesto';
    }
  }

  sendResetRequest() {
    if (this.resetRequest.valid) {
      let email = this.resetRequest.get('email')?.value;
      this.authSvc.resetRequest(email).subscribe((res) => {
        const modalRef = this.modalService.open(ModalFeedbackComponent, {
          size: 'md',
          centered: true,
        });
        modalRef.componentInstance.message =
          res.message +
          ' Controlla la tua casella email e segui le istruzioni per il reset della password';
        modalRef.componentInstance.isError = false;

        setTimeout(() => {
          this.modalService.dismissAll();
        }, 1000);
      });
    }
  }
}
