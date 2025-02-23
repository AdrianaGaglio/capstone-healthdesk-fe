import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { iDoctor } from '../interfaces/idoctor';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { iDoctorUpdateAdditionalInfo } from '../interfaces/idoctorupdateadditionalinfo';

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  constructor(private http: HttpClient, private authSvc: AuthService) {
    this.restoreDoctor();
  }

  url: string = environment.baseUrl + 'doctors';
  doctor$ = new BehaviorSubject<iDoctor | null>(null);

  // per admin
  getAll(): Observable<iDoctor[]> {
    return this.http.get<iDoctor[]>(this.url + '/all');
  }

  // get per il medico quando è autenticato
  getDoctor(): Observable<iDoctor> {
    return this.http.get<iDoctor>(this.url).pipe(
      tap((doctor) => {
        this.authSvc.user$.next(doctor);
        this.doctor$.next(doctor);
      })
    );
  }

  // get per admin e paziente
  getById(id: number): Observable<iDoctor> {
    return this.http
      .get<iDoctor>(`${this.url}/${id}`)
      .pipe(tap((doctor) => this.doctor$.next(doctor)));
  }

  restoreDoctor() {
    this.authSvc.auth$.subscribe((auth) => {
      if (auth && auth.role === 'DOCTOR') {
        this.getDoctor().subscribe();
      } else {
        this.getById(1).subscribe();
      }
    });
  }

  // modifica informazioni medico (servizi, specializzazioni, training ed esperienze)
  updateDoctorInfo(
    doctorId: number,
    updateRequest: Partial<iDoctorUpdateAdditionalInfo>
  ): Observable<iDoctor> {
    return this.http.put<iDoctor>(`${this.url}/${doctorId}`, updateRequest);
  }

  // modifca dati personali medico
  updateDoctorPersonalInfo(
    doctorId: number,
    doctor: iDoctor
  ): Observable<iDoctor> {
    return this.http.put<iDoctor>(
      `${this.url}/update-personal-info/${doctorId}`,
      doctor
    );
  }
}
