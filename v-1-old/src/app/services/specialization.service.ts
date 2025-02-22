import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { iDoctor } from '../interfaces/idoctorresponse';

@Injectable({
  providedIn: 'root',
})
export class SpecializationService {
  constructor(private http: HttpClient) {}

  url: string = environment.baseUrl + 'specialization';

  delete(id: number, specializationId: number): Observable<iDoctor> {
    return this.http.delete<iDoctor>(
      `${this.url}/${id}/delete-specialization?specializationId=${specializationId}`
    );
  }
}
