import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { iPatient } from '../../interfaces/ipatientresponse';
import { iDoctor } from '../../interfaces/idoctorresponse';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss',
})
export class DropdownComponent {
  constructor(private authService: AuthService) {}

  @Input() user!: iPatient | iDoctor;
  @Input() isLoggedIn: boolean = false;
  @Input() isDoctor: boolean = false;
  @Output() onClick = new EventEmitter<Event>();

  isAdmin: boolean = false;

  ngOnInit() {
    this.authService.auth$.subscribe((auth) => {
      if (auth?.role === 'ADMIN') {
        this.isAdmin = true;
      }
    });
  }

  logout(event: Event) {
    this.onClick.emit(event);
  }
}
