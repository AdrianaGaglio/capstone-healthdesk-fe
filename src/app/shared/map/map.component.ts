import { Component, Input, OnInit } from '@angular/core';
import { MapService } from '../../services/map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
})
export class MapComponent implements OnInit {
  constructor(private mapSvc: MapService) {}
  isLoaded: boolean = false;

  @Input() height: string = '100';
  @Input() width: string = '100%';

  latitude: number = 41.9028; // Latitudine di default (Roma)
  longitude: number = 12.4964; // Longitudine di default (Roma)
  @Input() zoom: number = 15; // Zoom predefinito

  @Input() address!: string;

  ngOnInit() {
    this.mapSvc.isLoaded$.subscribe((loaded) => {
      if (loaded) {
        this.mapSvc.getCoordinates(this.address).subscribe((coordinates) => {
          if (coordinates) {
            this.latitude = coordinates.lat;
            this.longitude = coordinates.lng;
            this.isLoaded = true;
          }
        });
      }
    });
  }
}
