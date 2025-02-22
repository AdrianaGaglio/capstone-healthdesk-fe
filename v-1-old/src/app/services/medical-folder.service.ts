import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import {
  iDocumentCreate,
  iMedicalFolder,
  iReminder,
} from '../interfaces/imedical-folder';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MedicalFolderService {
  constructor(private http: HttpClient) {}

  url: string = environment.baseUrl + 'medical-folder';

  get(): Observable<iMedicalFolder> {
    return this.http.get<iMedicalFolder>(this.url);
  }

  getByPatient(patientId: number): Observable<iMedicalFolder> {
    return this.http.get<iMedicalFolder>(`${this.url}/${patientId}`);
  }

  addPrescription(
    mfID: number,
    document: iDocumentCreate
  ): Observable<iMedicalFolder> {
    return this.http.put<iMedicalFolder>(
      `${this.url}/${mfID}/add-prescription`,
      document
    );
  }

  removePrescription(
    mfID: number,
    prescriptionId: number
  ): Observable<iMedicalFolder> {
    return this.http.delete<iMedicalFolder>(
      `${this.url}/${mfID}/delete-prescription?prescriptionId=${prescriptionId}`
    );
  }

  addCertificate(
    mfID: number,
    document: iDocumentCreate
  ): Observable<iMedicalFolder> {
    return this.http.put<iMedicalFolder>(
      `${this.url}/${mfID}/add-certificate`,
      document
    );
  }

  removeCertificate(
    mfID: number,
    certificateId: number
  ): Observable<iMedicalFolder> {
    return this.http.delete<iMedicalFolder>(
      `${this.url}/${mfID}/delete-certificate?certificateId=${certificateId}`
    );
  }

  addReminder(
    mfId: number,
    reminder: Partial<iReminder>
  ): Observable<iMedicalFolder> {
    return this.http.post<iMedicalFolder>(
      `${this.url}/${mfId}/add-reminder`,
      reminder
    );
  }

  removeReminder(mfId: number, reminderId: number): Observable<iMedicalFolder> {
    return this.http.delete<iMedicalFolder>(
      `${this.url}/${mfId}/remove-reminder?reminderId=${reminderId}`
    );
  }
}
