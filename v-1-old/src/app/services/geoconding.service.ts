import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GeocodingService {
  private apiUrl = 'https://nominatim.openstreetmap.org/search';

  constructor(private http: HttpClient) {}

  getCoordinates(
    address: string
  ): Observable<{ lat: number; lng: number } | null> {
    return this.http
      .get<any[]>(
        `${this.apiUrl}?q=${encodeURIComponent(address)}&format=json&limit=1`
      )
      .pipe(
        map((data) => {
          if (data.length > 0) {
            return {
              lat: parseFloat(data[0].lat),
              lng: parseFloat(data[0].lon),
            };
          } else {
            return null; // Indirizzo non trovato
          }
        })
      );
  }
}
