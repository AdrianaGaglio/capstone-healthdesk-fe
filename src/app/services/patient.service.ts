import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { iPatient } from '../interfaces/ipatient';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  constructor(private http: HttpClient) {}

  url: string = environment.baseUrl + 'patients';

  getPatient(): Observable<iPatient> {
    return this.http.get<iPatient>(this.url);
  }
}
