import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { iDoctor } from '../interfaces/idoctor';
import { iProvince, iCity } from '../interfaces/iaddress';

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
