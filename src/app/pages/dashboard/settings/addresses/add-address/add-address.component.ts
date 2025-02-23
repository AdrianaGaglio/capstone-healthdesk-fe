import {
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { iDoctorUpdateAddInfo } from '../../../../../interfaces/idoctorupdateaddinfo';
import { FormBuilder, NgForm, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { iProvince, iCity } from '../../../../../interfaces/iaddress';
import { iAddressRequestForDoctor } from '../../../../../interfaces/iaddressrequest';
import { iDoctor } from '../../../../../interfaces/idoctor';
import { AddressService } from '../../../../../services/address.service';
import { DoctorService } from '../../../../../services/doctor.service';
import { ModalFeedbackComponent } from '../../../../../shared/modalfeedback/modalfeedback.component';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrl: './add-address.component.scss',
})
export class AddAddressComponent {
  constructor(
    private doctorSvc: DoctorService,
    private addressSvc: AddressService,
    private fb: FormBuilder
  ) {}

  private activeModal = inject(NgbActiveModal);

  @Input() doctor!: iDoctor;

  provinces!: iProvince[];
  cities!: iCity[];
  provinceAcronym: string = '';

  newAddress: iAddressRequestForDoctor = {
    name: '',
    street: '',
    streetNumber: '',
    provinceAcronym: '',
    cityName: '',
    postalCode: '',
  };

  addressRequest!: FormGroup;

  ngOnInit() {
    this.addressRequest = this.fb.group({
      name: this.fb.control(null, [Validators.required]),
      street: this.fb.control(null, [Validators.required]),
      streetNumber: this.fb.control(null, [Validators.required]),
      province: this.fb.control(null, [Validators.required]),
      provinceAcronym: this.fb.control(null, [Validators.required]),
      city: this.fb.control(null, [Validators.required]),
      postalCode: this.fb.control(null, [Validators.required]),
    });

    this.addressRequest?.get('provinceAcronym')?.disable();
    this.addressRequest?.get('postalCode')?.disable();

    this.addressSvc.getProvinces().subscribe((res) => {
      this.provinces = res;
    });
  }

  isTouchedInvalid(field: string) {
    return (
      this.addressRequest.get(field)?.touched &&
      this.addressRequest.get(field)?.invalid
    );
  }

  setAcronym() {
    if (this.addressRequest) {
      let provinceAcronym = this.addressRequest.get('province')?.value;
      this.addressRequest.get('provinceAcronym')?.setValue(provinceAcronym);
      let province = this.provinces.find(
        (p) => p.acronym == provinceAcronym
      )!.name;
      this.addressSvc.getCitys(province).subscribe((res) => {
        this.cities = res;
      });
    }
  }

  setPostalCode() {
    let city = this.addressRequest.get('city')?.value;
    if (this.addressRequest && this.cities) {
      this.addressRequest
        .get('postalCode')
        ?.setValue(this.cities.find((c) => c.name == city)!.postalCode);
    }
  }

  createAddress() {
    let request: Partial<iDoctorUpdateAddInfo> = {
      id: this.doctor.id,
      addresses: [],
    };

    this.addressRequest.get('provinceAcronym')?.enable();
    this.addressRequest.get('postalCode')?.enable();

    request.addresses?.push(this.addressRequest.value);

    this.doctorSvc
      .updateDoctorInfo(this.doctor.id, request)
      .subscribe((res) => {
        this.activeModal.close(res);
      });
  }

  close(event: null) {
    this.activeModal.close(event);
  }
}
