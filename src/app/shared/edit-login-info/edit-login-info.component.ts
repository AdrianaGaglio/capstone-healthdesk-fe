import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { iAuthupdaterequest } from '../../interfaces/iauthupdaterequest';
import { iDoctor } from '../../interfaces/idoctor';
import { iPatient } from '../../interfaces/ipatient';
import { ModalFeedbackComponent } from '../modalfeedback/modalfeedback.component';
import { AuthService } from '../../auth/auth.service';
import { iAuthResponse } from '../../interfaces/iauthresponse';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-login-info',
  templateUrl: './edit-login-info.component.html',
  styleUrl: './edit-login-info.component.scss',
})
export class EditLoginInfoComponent {
  constructor(private authSvc: AuthService) {}

  @Input() user!: iDoctor | iPatient;

  @Output() onUpdate = new EventEmitter<iAuthResponse>();

  @ViewChild('form') form!: NgForm;

  edit: boolean = false;

  loginUpdate: iAuthupdaterequest = {
    email: '',
    oldPassword: '',
    newPassword: '',
  };

  showNewPassword: boolean = false;
  showOldPassword: boolean = false;

  updateLoginInfo() {
    this.loginUpdate.email = this.user.email;

    this.authSvc.updateLoginInfo(this.loginUpdate).subscribe((res) => {
      this.edit = false;
      this.onUpdate.emit(res);
      this.loginUpdate = {
        email: '',
        oldPassword: '',
        newPassword: '',
      };
    });
  }
}
