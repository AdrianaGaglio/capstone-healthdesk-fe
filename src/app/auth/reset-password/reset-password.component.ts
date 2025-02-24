import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
})
export class ResetPasswordComponent {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private authSvc: AuthService
  ) {}

  newPasswordRequest!: FormGroup;
  showPassword: boolean = false;

  ngOnInit() {
    this.route.params.subscribe((params) => {
      let token = params['token'];

      this.newPasswordRequest = this.fb.group({
        password: this.fb.control('', [
          Validators.required,
          Validators.minLength(8),
        ]),
        token: this.fb.control(token),
      });
    });
  }

  isTouchedInvalid(field: string) {
    return (
      this.newPasswordRequest.get(field)?.touched &&
      this.newPasswordRequest.get(field)?.invalid
    );
  }

  reset() {
    if (this.newPasswordRequest.valid) {
      this.authSvc
        .newPassword(this.newPasswordRequest.value)
        .subscribe((res) => {
          this.authSvc.setCookie(res);

          setTimeout(() => {
            this.router.navigate(['/auth']);
          }, 1000);
        });
    }
  }
}
