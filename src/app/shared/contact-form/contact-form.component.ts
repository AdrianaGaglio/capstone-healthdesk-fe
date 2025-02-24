import { Component, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmailService } from '../../services/email.service';
import { iDoctor } from '../../interfaces/idoctor';
import { ModalFeedbackComponent } from '../modalfeedback/modalfeedback.component';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss',
})
export class ContactFormComponent implements OnInit {
  mailRequest!: FormGroup;

  @Input() doctor!: iDoctor;
  private modalService = inject(NgbModal);

  constructor(private fb: FormBuilder, private emailSvc: EmailService) {}

  ngOnInit() {
    this.mailRequest = this.fb.group({
      from: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      subject: ['', Validators.required],
      body: ['', Validators.required],
      doctorId: [this.doctor ? this.doctor.id : null], // Valore nullo temporaneo
    });
  }
  ngOnChanges() {
    if (this.doctor && this.mailRequest) {
      this.mailRequest.get('doctorId')?.setValue(this.doctor.id);
    }
  }

  isTouchedInvalid(field: string) {
    return (
      this.mailRequest.get(field)?.touched &&
      this.mailRequest.get(field)?.invalid
    );
  }

  getMessage(field: string) {
    if (this.mailRequest.get(field)?.hasError('email')) {
      return 'Email non valida';
    } else {
      return 'Campo obbligatorio';
    }
  }

  sendMail() {
    if (this.mailRequest.valid) {
      this.emailSvc.sendContactMail(this.mailRequest.value).subscribe((res) => {
        if (res) {
          this.openModal(res.message);
        }
      });
    }
  }

  openModal(message: string) {
    const modalRef = this.modalService.open(ModalFeedbackComponent, {
      size: 'md',
      centered: true,
    });

    modalRef.componentInstance.message = message;
    modalRef.componentInstance.isError = false;

    setTimeout(() => {
      this.modalService.dismissAll();
    }, 1000);
  }
}
