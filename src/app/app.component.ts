import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PatientService } from './services/patient.service';
import { DoctorService } from './services/doctor.service';
import { AuthService } from './auth/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { combineLatest, filter, forkJoin, switchMap, take } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  showHeaderFooter: boolean = true;
  showDashboardHeaderFooter: boolean = false;

  constructor(
    private router: Router,
    private authSvc: AuthService,
    private doctorSvc: DoctorService,
    private patientSvc: PatientService,
    private cookie: CookieService
  ) {
    this.router.events.subscribe(() => {
      const currentRoute = this.router.url;
      // Nascondi header e footer per le pagine di login e registrazione
      this.showHeaderFooter = !(
        currentRoute.includes('/auth') ||
        currentRoute.includes('/dashboard') ||
        currentRoute.includes('/paziente') ||
        currentRoute.includes('/dettagli-appuntamento') ||
        currentRoute.includes('/admin')
      );

      this.showDashboardHeaderFooter =
        currentRoute.includes('/dashboard') ||
        currentRoute.includes('/paziente') ||
        currentRoute.includes('/dettagli-appuntamento') ||
        currentRoute.includes('/admin');
    });
  }

  ngOnInit() {
    forkJoin({
      count: this.authSvc.count(),
      checkdb: this.authSvc.checkDb(),
    }).subscribe(({ count, checkdb }) => {
      if (count.configured && checkdb.configured) {
        this.authSvc.isLoggedIn$
          .pipe(
            filter((res) => res),
            switchMap(() =>
              this.authSvc.auth$.pipe(
                filter((auth) => !!auth),
                take(1)
              )
            )
          )
          .subscribe((auth) => {
            if (auth.role === 'DOCTOR') {
              this.doctorSvc.getDoctor().subscribe();
            } else if (auth.role === 'PATIENT') {
              this.patientSvc.getPatient().subscribe();
            }
          });
      } else {
        if (!count.configured) {
          this.router.navigate(['/auth/register']);
        }
      }
    });
  }
}
