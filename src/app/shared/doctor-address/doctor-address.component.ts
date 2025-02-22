import { Component, Input } from '@angular/core';
import { iAddress, iAddressForDoctor } from '../../interfaces/iaddress';

@Component({
  selector: 'app-doctor-address',
  templateUrl: './doctor-address.component.html',
  styleUrl: './doctor-address.component.scss',
})
export class DoctorAddressComponent {
  @Input() addresses!: iAddressForDoctor[];

  getAddress(address: iAddress): string {
    let stringAddress =
      address.street +
      ',' +
      address.streetNumber +
      ',' +
      address.city +
      ',' +
      address.province +
      ',' +
      address.postalCode;

    return stringAddress.replace(' ', '+');
  }
}
