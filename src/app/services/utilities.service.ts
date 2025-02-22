import { Observable } from 'rxjs';
import { iDoctor } from './../interfaces/idoctor';
import { iPatient } from './../interfaces/ipatient';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class UtilitiesService {
  constructor(private authSvc: AuthService) {}

  getAvatar(user: iPatient | iDoctor | null): string {
    if (!user) {
      return 'https://ui-avatars.com/api/?name=A';
    } else {
      return user.avatar
        ? user.avatar
        : 'https://ui-avatars.com/api/?name=' + user.name + '+' + user.surname;
    }
  }
}
