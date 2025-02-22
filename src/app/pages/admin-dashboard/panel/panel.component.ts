import { Component, ViewChild } from '@angular/core';
import { DoctorService } from '../../../services/doctor.service';
import { iDoctor } from '../../../interfaces/idoctorresponse';
import { Router } from '@angular/router';
import { iDoctorRequest } from '../../../interfaces/idoctorrequest';
import { iDoctorregister } from '../../../interfaces/idoctorregister';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../../auth/auth.service';
import { iAddressRequestForDoctor } from '../../../interfaces/iaddressrequestfordoctor';
import { iCity } from '../../../interfaces/icity';
import { iProvince } from '../../../interfaces/iprovince';
import { AddressService } from '../../../services/address.service';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.scss',
})
export class PanelComponent {
  constructor(
    private doctorSvc: DoctorService,
    private router: Router,
    private authSvc: AuthService,
    private addressSvc: AddressService
  ) {}

  @ViewChild('form') form!: NgForm;

  doctors!: iDoctor[];

  add: boolean = false;

  newDoctor: iDoctorregister = {
    email: '',
    password: '',
    doctor: {
      name: '',
      surname: '',
      avatar: '',
      phoneNumber: '',
      licenceNumber: '',
      addresses: [],
    },
  };

  addAddress: boolean = false;

  provinces!: iProvince[];
  cities!: iCity[];
  provinceAcronym: string = '';

  newAddress: iAddressRequestForDoctor = {
    name: '',
    street: '',
    streetNumber: '',
    provinceAcronym: '',
    city: '',
    postalCode: '',
  };

  ngOnInit() {
    this.doctorSvc.getAll().subscribe((res) => {
      this.doctors = res;
    });

    this.addressSvc.getProvinces().subscribe((res: iProvince[]) => {
      this.provinces = res;
    });
  }

  setAcronym() {
    this.provinceAcronym = this.newAddress.provinceAcronym;
    let province = this.provinces.find(
      (p) => p.acronym == this.provinceAcronym
    )!.name;
    this.addressSvc.getCitys(province).subscribe((res: iCity[]) => {
      this.cities = res;
    });
  }

  setPostalCode() {
    this.newAddress.postalCode = this.cities.find(
      (c) => c.name == this.newAddress.city
    )!.postalCode;
  }

  handleDoctor(id: number) {
    this.router.navigate(['/dashboard']);
  }

  save() {
    if (this.form.valid) {
      this.newDoctor.password = 'temp_password';
      this.newDoctor.doctor.addresses = [];
      this.newDoctor.doctor.addresses.push(this.newAddress);
      this.authSvc.registerDoctor(this.newDoctor).subscribe({
        next: (res) => {
          this.doctors.push(res);
          this.doctors = this.doctors.sort((a, b) => a.id - b.id);
          this.add = false;
          localStorage.removeItem('configured');
          this.add = false;
          this.form.reset();
        },
        error: (res) => {
          this.add = false;
        },
      });
    }
  }
}
