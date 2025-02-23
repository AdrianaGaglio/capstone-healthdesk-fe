import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { combineLatest } from 'rxjs';
import { AuthService } from '../../../auth/auth.service';
import { iDoctor } from '../../../interfaces/idoctor';
import { iPatient } from '../../../interfaces/ipatient';
import { UtilitiesService } from '../../../services/utilities.service';
import { AuthFormComponent } from '../../../shared/auth/auth-form.component';

@Component({
  selector: 'app-front-header',
  templateUrl: './front-header.component.html',
  styleUrl: './front-header.component.scss',
})
export class FrontHeaderComponent {
  constructor(
    private authSvc: AuthService,
    private utilities: UtilitiesService
  ) {}

  isLoggedIn!: boolean;
  isAdmin!: boolean;
  isDoctor!: boolean;

  avatar!: string;
  user!: iPatient | iDoctor;

  private modalService = inject(NgbModal);

  ngOnInit() {
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

  @ViewChild('menu') menu!: ElementRef;

  openMenu() {
    if (this.menu) {
      this.menu.nativeElement.classList.toggle('show');
    }
  }

  openAuthModal() {
    this.modalService.open(AuthFormComponent, { centered: true, size: 'md' });
  }

  logout() {
    this.authSvc.logout();
    this.isLoggedIn = false;
  }
}
