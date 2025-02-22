import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private authSvc: AuthService,
    private router: Router
  ) {}

  adminRequest!: FormGroup;

  ngOnInit() {
    this.adminRequest = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required]),
      code: this.fb.control('', [Validators.required]),
    });
  }

  registerAdmin() {
    if (this.adminRequest.valid) {
      this.authSvc.registerAdmin(this.adminRequest.value).subscribe((res) => {
        this.router.navigate(['/auth']);
      });
    }
  }
}
