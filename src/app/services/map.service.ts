import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  constructor(private http: HttpClient) {
    this.getApiKey();
  }

  url: string = environment.baseUrl + 'geocoding';

  coordinates$ = new BehaviorSubject<{ lat: number; lng: number } | null>(null);

  protected apiKey!: string;

  private isLoaded = false;
  isLoaded$ = new Subject<boolean>();

  getApiKey() {
    this.http
      .get<{ apiKey: string }>(this.url + '/api-key')
      .subscribe((res) => {
        if (res) {
          this.apiKey = res.apiKey;
          this.loadMap(this.apiKey);
        }
      });
  }

  loadMap(apiKey: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.isLoaded) {
        resolve(); // Se è già stato caricato, risolvi la Promise immediatamente
        return;
      }

      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
      script.async = true;
      script.defer = true;

      script.onload = () => {
        this.isLoaded = true;
        this.isLoaded$.next(true);
        resolve();
      };

      script.onerror = (error) => {
        reject(error);
      };

      document.head.appendChild(script);
    });
  }

  getCoordinates(address: string): Observable<{ lat: number; lng: number }> {
    return this.http.get<{ lat: number; lng: number }>(
      `${this.url}/coordinates?address=${address}`
    );
  }
}
