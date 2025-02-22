import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-dashboard-footer',
  templateUrl: './dashboard-footer.component.html',
  styleUrl: './dashboard-footer.component.scss',
})
export class DashboardFooterComponent {
  constructor(private authSvc: AuthService) {}

  isPatient: boolean = false;

  ngOnInit() {
    this.authSvc.auth$.subscribe((auth) => {
      if (auth && auth.role === 'PATIENT') this.isPatient = true;
    });
  }
}
