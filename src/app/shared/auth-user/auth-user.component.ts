import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { iPatient } from '../../interfaces/ipatientresponse';
import { DoctorService } from '../../services/doctor.service';
import { PatientService } from '../../services/patient.service';

@Component({
  selector: 'app-auth-user',
  templateUrl: './auth-user.component.html',
  styleUrl: './auth-user.component.scss',
})
export class AuthUserComponent {
  constructor(
    private fb: FormBuilder,
    private authSvc: AuthService,
    private router: Router,
    private doctorSvc: DoctorService,
    private patientSvc: PatientService
  ) {}

  activeModal = inject(NgbActiveModal);

  loginRequest!: FormGroup;
  showPassword: boolean = false;

  register: boolean = false;

  ngOnInit() {
    this.loginRequest = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required]),
    });
  }

  login() {
    if (this.loginRequest.valid) {
      this.authSvc.login(this.loginRequest.value).subscribe((res) => {
        if (res.role === 'DOCTOR' || res.role === 'ADMIN') {
          this.doctorSvc.getDoctor().subscribe();
          this.router.navigate(['/dashboard']);
        } else {
          this.patientSvc.getPatient().subscribe();
          this.router.navigate(['/paziente']);
        }
      });
    }
  }

  isTouchedInvalid(field: string) {
    return (
      this.loginRequest.get(field)?.touched &&
      this.loginRequest.get(field)?.invalid
    );
  }

  message(field: string) {
    if (this.loginRequest.get('email')?.hasError('email')) {
      return 'Email non valida';
    } else {
      return 'Campo obbligatorio';
    }
  }

  emitPatient(patient: iPatient) {
    this.activeModal.close(patient);
  }
}
