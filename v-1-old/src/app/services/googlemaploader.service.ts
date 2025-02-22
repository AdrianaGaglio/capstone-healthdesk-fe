import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GoogleMapsLoader {
  private isLoaded = false;
  isLoaded$ = new Subject<boolean>();

  constructor() {}

  load(apiKey: string): Promise<void> {
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
}
