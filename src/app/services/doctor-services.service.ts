import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { iDoctor } from '../interfaces/idoctorresponse';

@Injectable({
  providedIn: 'root',
})
export class DoctorServicesService {
  constructor(private http: HttpClient) {}

  url: string = environment.baseUrl + 'services';

  updateAvailability(doctorId: number, serviceId: number): Observable<iDoctor> {
    return this.http.put<iDoctor>(
      `${this.url}/${doctorId}/change-availability?serviceId=${serviceId}`,
      serviceId
    );
  }

  updateActivation(doctorId: number, serviceId: number) {
    return this.http.put<iDoctor>(
      `${this.url}/${doctorId}/change-activation?serviceId=${serviceId}`,
      serviceId
    );
  }

  deleteService(doctorId: number, serviceId: number): Observable<iDoctor> {
    return this.http.delete<iDoctor>(
      `${this.url}/${doctorId}/delete-service?serviceId=${serviceId}`
    );
  }
}
