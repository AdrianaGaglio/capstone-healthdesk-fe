import { Component, EventEmitter, Input, Output } from '@angular/core';
import { iDoctor } from '../../../interfaces/idoctorresponse';
import { iPatient } from '../../../interfaces/ipatientresponse';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-sub-menu',
  templateUrl: './sub-menu.component.html',
  styleUrl: './sub-menu.component.scss',
})
export class SubMenuComponent {
  constructor(private authSvc: AuthService) {}
  @Input() user!: iPatient | iDoctor;
  @Input() isLoggedIn: boolean = false;
  @Input() isDoctor: boolean = false;

  @Output() onClick = new EventEmitter<Event>();

  isAdmin: boolean = false;

  ngOnInit() {
    this.authSvc.auth$.subscribe((auth) => {
      if (auth && auth.role === 'ADMIN') {
        this.isAdmin = true;
      }
    });
  }

  logout(event: Event) {
    this.onClick.emit(event);
  }
}
