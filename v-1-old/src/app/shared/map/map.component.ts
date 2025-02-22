import { Component, Input, AfterViewInit, Inject } from '@angular/core';
import { GoogleMapsLoader } from '../../services/googlemaploader.service';
import { GeocodingService } from '../../services/geoconding.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent {
  @Input() address: string = 'Roma, Italia'; // Indirizzo iniziale

  constructor(
    private geocodingSvc: GeocodingService,
    private googlemapSvc: GoogleMapsLoader,
    @Inject('googleMapsApiKey') private googleMapsApiKey: string
  ) {
    this.apiKey = googleMapsApiKey;
  }

  apiKey!: string;
  isLoaded: boolean = false;

  @Input() height: string = '100';
  @Input() width: string = '150';

  latitude: number = 41.9028; // Latitudine di default (Roma)
  longitude: number = 12.4964; // Longitudine di default (Roma)
  @Input() zoom: number = 15; // Zoom predefinito

  ngOnInit() {
    if (this.apiKey) {
      this.googlemapSvc.load(this.apiKey);

      this.googlemapSvc.isLoaded$.subscribe((res) => {
        if (res) {
          this.geocodingSvc.getCoordinates(this.address).subscribe((res) => {
            if (res) {
              this.latitude = res.lat;
              this.longitude = res.lng;
              this.isLoaded = true;
            }
          });
        }
      });
    }
  }
}
