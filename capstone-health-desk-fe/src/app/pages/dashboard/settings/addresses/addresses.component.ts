import { Component, OnInit } from '@angular/core';
import { AddressService } from '../../../../services/address.service';
import { iAddressForDoctor } from '../../../../interfaces/iaddressresponsefordoctor';
import { AuthService } from '../../../../auth/auth.service';
import { iDoctor } from '../../../../interfaces/idoctorresponse';
import { DoctorService } from '../../../../services/doctor.service';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrl: './addresses.component.scss',
})
export class AddressesComponent implements OnInit {
  constructor(
    private addressSvc: AddressService,
    private authSvc: AuthService,
    private doctorSvc: DoctorService
  ) {}

  addresses: iAddressForDoctor[] = [];
  doctor!: iDoctor;

  ngOnInit() {
    this.doctorSvc.doctor$.subscribe((doctor) => {
      if (doctor) {
        this.doctor = doctor;
        this.addresses = this.doctor.addresses.sort(
          (a, b) => a.address.id - b.address.id
        );
      }
    });
  }

  deleteAddress(id: number) {
    this.addressSvc.deleteDoctorAddress(id).subscribe((res) => {
      this.addresses = res.addresses;
    });
  }

  updateAddress(doctor: iDoctor) {
    this.addresses = doctor.addresses.sort(
      (a, b) => a.address.id - b.address.id
    );
  }
}
