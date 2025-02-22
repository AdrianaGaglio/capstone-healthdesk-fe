import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { DoctorService } from '../../../services/doctor.service';
import { PatientService } from '../../../services/patient.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent implements OnInit {
  constructor(
    private authSvc: AuthService,
    private doctorSvc: DoctorService,
    private patientSvc: PatientService,
    private fb: FormBuilder
  ) {}

  loginRequest!: FormGroup;
  showPassword: boolean = false;

  @Output() onLogin = new EventEmitter<number>();

  ngOnInit() {
    this.loginRequest = this.fb.group({
      email: this.fb.control(null, [Validators.required]),
      password: this.fb.control(null, [Validators.required]),
      remember: this.fb.control(false),
    });
  }

  isTouchedInvalid(field: string) {
    return (
      this.loginRequest.get(field)?.touched &&
      this.loginRequest.get(field)?.invalid
    );
  }

  login() {
    if (this.loginRequest.valid) {
      this.authSvc.login(this.loginRequest.value).subscribe({
        next: (res) => {
          this.loginRequest.reset();
          if (res.role === 'DOCTOR') {
            this.doctorSvc.getDoctor().subscribe();
          } else if (res.role === 'PATIENT') {
            this.patientSvc.getPatient().subscribe((patient) => {
              this.onLogin.emit(patient.id);
            });
          }
        },
      });
    }
  }
}
