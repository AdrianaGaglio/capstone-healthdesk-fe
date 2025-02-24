import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { iEmailRequest } from '../interfaces/iemailrequest';
import { iMessage } from '../interfaces/imessage';

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
