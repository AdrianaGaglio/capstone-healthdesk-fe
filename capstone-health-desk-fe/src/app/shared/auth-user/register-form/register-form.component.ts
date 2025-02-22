import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';
import { iPatient } from '../../../interfaces/ipatientresponse';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss',
})
export class RegisterFormComponent {
  constructor(
    private fb: FormBuilder,
    private authSvc: AuthService,
    private router: Router
  ) {}

  registerRequest!: FormGroup;
  showPassword: boolean = false;

  @Output() onRegister = new EventEmitter<iPatient>();

  ngOnInit() {
    this.registerRequest = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
      patient: this.fb.group({
        name: this.fb.control('', [Validators.required]),
        surname: this.fb.control('', [Validators.required]),
        birthDate: this.fb.control('', [Validators.required]),
        phoneNumber: this.fb.control('', [
          Validators.required,
          Validators.pattern(/^\+?\d{6,15}$/),
        ]),
      }),
    });
  }

  isTouchedInvalid(field: string) {
    return (
      this.registerRequest.get(field)?.touched &&
      this.registerRequest.get(field)?.invalid
    );
  }

  message(field: string) {
    if (this.registerRequest.get(field)?.hasError('email')) {
      return 'Email non valida';
    } else if (this.registerRequest.get(field)?.hasError('pattern')) {
      return 'Numero non valido';
    } else {
      return 'Campo obbligatorio';
    }
  }

  register() {
    if (this.registerRequest.valid) {
      this.authSvc.registerUser(this.registerRequest.value).subscribe((res) => {
        this.onRegister.emit(res);
      });
    }
  }
}
