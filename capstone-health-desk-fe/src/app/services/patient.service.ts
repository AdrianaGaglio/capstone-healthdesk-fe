import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { iPatient } from '../interfaces/ipatientresponse';
import { iPatientPaged } from '../interfaces/ipatientpagedresponse';
import { iMessage } from '../interfaces/imessage';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  constructor(private http: HttpClient, private authSvc: AuthService) {}

  url: string = environment.baseUrl + 'patients';

  getPatient(): Observable<iPatient> {
    return this.http
      .get<iPatient>(this.url)
      .pipe(tap((p) => this.authSvc.user$.next(p)));
  }

  getAll(): Observable<iPatient[]> {
    return this.http.get<iPatient[]>(this.url + '/all');
  }

  getAllPaged(
    page: number = 0,
    size: number = 10,
    sort?: string[]
  ): Observable<iPatientPaged> {
    let url = this.url + `/paged?page=${page}&size=${size}`;
    if (sort && sort.length > 0) {
      sort.forEach((s) => (url += `&sort=${s}`));
    }
    return this.http.get<iPatientPaged>(url);
  }

  getById(id: number): Observable<iPatient> {
    return this.http.get<iPatient>(`${this.url}/${id}`);
  }

  delete(id: number): Observable<iMessage> {
    return this.http.delete<iMessage>(`${this.url}/${id}`);
  }

  update(patientId: number, patient: Partial<iPatient>): Observable<iPatient> {
    return this.http.put<iPatient>(`${this.url}/${patientId}`, patient);
  }

  search(
    search: string,
    page: number = 0,
    size: number = 10,
    sort?: string[]
  ): Observable<iPatientPaged> {
    let url =
      this.url + `/search?identifier=${search}&page=${page}&size=${size}`;
    if (sort && sort.length > 0) {
      sort.forEach((s) => (url += `&sort=${s}`));
    }

    return this.http.get<iPatientPaged>(url);
  }
}
