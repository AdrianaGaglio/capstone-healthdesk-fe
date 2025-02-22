import { Component, inject, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { iDoctor } from '../../interfaces/idoctorresponse';
import { iPatient } from '../../interfaces/ipatientresponse';
import { filter } from 'rxjs';
import { LayoutService } from '../../services/layout.service';
import {
  NgbDropdownModule,
  NgbDropdownMenu,
  NgbDropdownItem,
  NgbDropdownConfig,
} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  constructor(
    private authSvc: AuthService,
    private router: Router,
    private layoutSvc: LayoutService
  ) {}

  isLoggedIn!: boolean;
  user!: iPatient | iDoctor;

  isFront!: boolean;
  isDashboard!: boolean;
  isDoctor: boolean = false;

  isMenuCollapsed: boolean = true;

  isMobile!: boolean;

  ngOnInit() {
    this.layoutSvc.getLayoutMax990().subscribe((res) => {
      this.isMobile = res;
    });

    // controllo l'url per diversificare il menù di navigazione
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        if (event.url.includes('dashboard') || event.url.includes('paziente')) {
          this.isFront = false;
        } else {
          this.isFront = true;
        }
      });

    // controllo se l'utente è loggato
    this.authSvc.isLoggedIn$.subscribe(
      (isLoggedIn) => (this.isLoggedIn = isLoggedIn)
    );

    this.authSvc.auth$.subscribe((auth) => {
      if (auth) {
        if (auth.role !== 'PATIENT') {
          this.isDoctor = true;
        }
      }
    });

    // subject che viene valorizzato con i dati dell'utente loggato
    this.authSvc.user$.subscribe((res) => {
      if (res) {
        this.user = res;
        console.log(this.user);
      }
    });
  }

  logout(event: Event) {
    this.authSvc.logout();
  }

  closeMenu() {
    if (this.isMobile) {
      this.isMenuCollapsed = !this.isMenuCollapsed;
    }
  }
}
