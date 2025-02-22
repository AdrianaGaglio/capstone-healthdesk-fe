import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  constructor(private http: HttpClient) {}

  url: string = environment.baseUrl + 'files';

  uploadPrescription(formData: FormData): Observable<string> {
    return this.http.post<string>(`${this.url}/upload-prescription`, formData, {
      responseType: 'text' as 'json',
    });
  }

  uploadImage(formData: FormData): Observable<string> {
    return this.http.post<string>(`${this.url}/upload-image`, formData, {
      responseType: 'text' as 'json',
    });
  }
}
