import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { iMessage } from '../interfaces/imessage';
import { Observable } from 'rxjs';
import { iEmailRequest } from '../interfaces/iemailrequest';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  constructor(private http: HttpClient) {}

  url: string = environment.baseUrl + 'email';

  sendContactMail(mailRequest: Partial<iEmailRequest>): Observable<iMessage> {
    return this.http.post<iMessage>(`${this.url}/contact`, mailRequest);
  }
}
