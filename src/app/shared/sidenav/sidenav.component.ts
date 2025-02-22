import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { iPatient } from '../../interfaces/ipatientresponse';
import { iDoctor } from '../../interfaces/idoctorresponse';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { LayoutService } from '../../services/layout.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent {
  constructor(
    config: NgbDropdownConfig,
    private authSvc: AuthService,
    private layoutSvc: LayoutService
  ) {
    // customize default values of dropdowns used by this component tree
    config.placement = 'right';
  }

  isLoggedIn: boolean = false;
  isDoctor: boolean = false;
  user!: iPatient | iDoctor;

  show: boolean = false;

  isMobile: boolean = false;

  isAdmin: boolean = false;

  ngOnInit() {
    this.authSvc.auth$.subscribe((auth) => {
      if (auth?.role === 'ADMIN') {
        this.isAdmin = true;
      }
    });

    this.layoutSvc.getLayoutMax1200().subscribe((res) => {
      this.isMobile = res;
    });

    // controllo se l'utente è loggato
    this.authSvc.isLoggedIn$.subscribe(
      (isLoggedIn) => (this.isLoggedIn = isLoggedIn)
    );

    this.authSvc.auth$.subscribe((res) => {
      if (res) {
        if (res.role !== 'PATIENT') {
          this.isDoctor = true;
        }
      }
    });

    // subject che viene valorizzato con i dati dell'utente loggato
    this.authSvc.user$.subscribe((res) => {
      if (res) this.user = res;
    });
  }

  logout() {
    this.authSvc.logout();
  }
}
