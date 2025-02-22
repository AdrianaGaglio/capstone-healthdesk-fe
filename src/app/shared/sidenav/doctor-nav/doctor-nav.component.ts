import { Component } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-doctor-nav',
  templateUrl: './doctor-nav.component.html',
  styleUrl: './doctor-nav.component.scss',
})
export class DoctorNavComponent {
  constructor(private authSvc: AuthService) {}

  isAdmin: boolean = false;
  isConfigured: boolean = true;

  ngOnInit() {
    this.authSvc.auth$.subscribe((auth) => {
      if (auth && auth.role === 'ADMIN') {
        this.isAdmin = true;
      }
    });
    this.authSvc.checkDb().subscribe((res) => {
      if (!res.configured) {
        this.isConfigured = false;
      }
    });
  }
}
