import { Component } from '@angular/core';
import { PatientService } from './services/patient.service';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(
    private patientSvc: PatientService,
    private authSvc: AuthService
  ) {}

  ngOnInit() {
    this.authSvc.auth$.subscribe((auth) => {
      if (auth && auth.role === 'PATIENT') {
        this.patientSvc.getPatient().subscribe();
      }
    });
  }
}
