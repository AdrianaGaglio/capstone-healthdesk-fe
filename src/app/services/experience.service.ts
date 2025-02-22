import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { iDoctor } from '../interfaces/idoctorresponse';

@Injectable({
  providedIn: 'root',
})
export class ExperienceService {
  constructor(private http: HttpClient) {}

  url: string = environment.baseUrl + 'experience';

  delete(id: number, experienceId: number): Observable<iDoctor> {
    return this.http.delete<iDoctor>(
      `${this.url}/${id}/delete-experience?experienceId=${experienceId}`
    );
  }
}
