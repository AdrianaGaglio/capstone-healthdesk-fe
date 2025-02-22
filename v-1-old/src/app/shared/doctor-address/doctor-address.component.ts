import { Component, Input } from '@angular/core';
import { iDoctor } from '../../interfaces/idoctorresponse';
import { iAddress } from '../../interfaces/iaddressresponse';
import { iAddressForDoctor } from '../../interfaces/iaddressresponsefordoctor';

@Component({
  selector: 'app-doctor-address',
  templateUrl: './doctor-address.component.html',
  styleUrl: './doctor-address.component.scss',
})
export class DoctorAddressComponent {
  @Input() doctor!: iDoctor;
  @Input() isHomePage: boolean = false;

  @Input() showMap: boolean = true;

  address!: string;

  getAddress(address: iAddressForDoctor): string {
    let stringAddress =
      address.address.street +
      ',' +
      address.address.streetNumber +
      ',' +
      address.address.city +
      ',' +
      address.address.province +
      ',' +
      address.address.postalCode;

    return stringAddress.replace(' ', '+');
  }
}
