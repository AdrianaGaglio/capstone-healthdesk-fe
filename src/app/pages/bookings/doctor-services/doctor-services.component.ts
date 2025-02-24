import { Component, EventEmitter, Input, Output } from '@angular/core';
import { iService } from '../../../interfaces/idoctor';

@Component({
  selector: 'app-doctor-services',
  templateUrl: './doctor-services.component.html',
  styleUrl: './doctor-services.component.scss',
})
export class DoctorServicesComponent {
  @Input() services!: iService[];

  showMore!: boolean;

  @Output() onServiceSelected = new EventEmitter<iService>();

  selectService(service: iService) {
    this.onServiceSelected.emit(service);
  }
}
