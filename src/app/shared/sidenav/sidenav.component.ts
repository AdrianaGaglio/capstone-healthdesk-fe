import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { UtilitiesService } from '../../services/utilities.service';
import { combineLatest } from 'rxjs';
import { iDoctor } from '../../interfaces/idoctor';
import { iPatient } from '../../interfaces/ipatient';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent {
  constructor(
    private authSvc: AuthService,
    private utilities: UtilitiesService,
    private router: Router
  ) {}

  show: boolean = false;

  isDoctor: boolean = true;

  avatar!: string;

  isLoggedIn!: boolean;

  user!: iPatient | iDoctor;

  ngOnInit() {
    if (this.router.url.includes('paziente')) {
      this.isDoctor = false;
    } else {
      this.isDoctor = true;
    }

    combineLatest([this.authSvc.auth$, this.authSvc.user$]).subscribe(
      ([auth, user]) => {
        if (auth) {
          this.isLoggedIn = true;
          auth.role == 'DOCTOR'
            ? (this.isDoctor = true)
            : (this.isDoctor = false);
        }
        if (user) {
          this.user = user;
          this.avatar = this.utilities.getAvatar(user);
        }
      }
    );
  }

  logout() {
    this.authSvc.logout();
    this.isLoggedIn = false;
  }
}
