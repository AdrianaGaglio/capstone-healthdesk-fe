import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../../../environments/environment.development';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss',
})
export class RegisterFormComponent {
  constructor(private authSvc: AuthService, private fb: FormBuilder) {}

  registerRequest!: FormGroup;

  prefixes: string[] = environment.prefixes;

  @Output() onRegister = new EventEmitter<number>();

  ngOnInit() {
    this.registerRequest = this.fb.group({
      email: this.fb.control(null, [Validators.required, Validators.email]),
      patient: this.fb.group({
        name: this.fb.control(null, [Validators.required]),
        surname: this.fb.control(null, [Validators.required]),
        prefixes: this.fb.control('+39', [Validators.required]),
        phoneNumber: this.fb.control(null, [
          Validators.required,
          Validators.pattern(/^\+?\d{6,15}$/),
        ]),
        birthDate: this.fb.control(null, [Validators.required]),
      }),
    });
  }

  isTouchedInvalid(field: string) {
    return (
      this.registerRequest.get(field)?.touched &&
      this.registerRequest.get(field)?.invalid
    );
  }

  register() {
    if (this.registerRequest.valid) {
      this.registerRequest
        .get('phoneNumber')
        ?.setValue(
          `${this.registerRequest.get('prefixes')?.value}${
            this.registerRequest.get('phoneNumber')?.value
          }`
        );

      this.authSvc.registerPatient(this.registerRequest.value).subscribe({
        next: (patient) => {
          this.registerRequest.reset();
          this.registerRequest.get('prefixes')?.setValue('+39');
          this.onRegister.emit(patient.id);
        },
      });
    }
  }
}
