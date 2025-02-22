import { Component } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrl: './dashboard-header.component.scss',
})
export class DashboardHeaderComponent {
  constructor(private authSvc: AuthService, private router: Router) {}

  goBack(): void {
    if (window.history.back() != undefined) {
      window.history.back();
    } else {
      this.authSvc.auth$.subscribe((res) => {
        if (res?.role != 'PATIENT') {
          this.router.navigate(['/dashboard']);
        } else {
          this.router.navigate(['/paziente']);
        }
      });
    }
  }
}
