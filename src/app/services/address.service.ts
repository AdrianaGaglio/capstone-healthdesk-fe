import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { iProvince } from '../interfaces/iprovince';
import { iCity } from '../interfaces/icity';
import { iDoctor } from '../interfaces/idoctorresponse';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  constructor(private http: HttpClient) {}

  url: string = environment.baseUrl + 'addresses';

  getProvinces(): Observable<iProvince[]> {
    return this.http.get<iProvince[]>(`${this.url}/provinces`);
  }

  getCitys(province: string): Observable<iCity[]> {
    return this.http.get<iCity[]>(`${this.url}/cities/${province}`);
  }

  deleteDoctorAddress(id: number): Observable<iDoctor> {
    return this.http.delete<iDoctor>(`${this.url}/doctor/${id}`);
  }
}
