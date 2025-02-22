import {
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { iDoctor } from '../../interfaces/idoctorresponse';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { iAddressRequestForDoctor } from '../../interfaces/iaddressrequestfordoctor';
import { iDoctorUpdateAddInfo } from '../../interfaces/idoctorupdateaddinfo';
import { DoctorService } from '../../services/doctor.service';
import { AddressService } from '../../services/address.service';
import { iProvince } from '../../interfaces/iprovince';
import { iCity } from '../../interfaces/icity';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalFeedbackComponent } from '../modal-feedback/modal-feedback.component';

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

  private modalService = inject(NgbModal);

  @Input() doctor!: iDoctor;
  @Output() updatedDoctor = new EventEmitter<iDoctor>();
  @ViewChild('form') form!: NgForm;

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
        this.updatedDoctor.emit(res);
        this.addressRequest.reset();
        this.addAddress = false;

        const modalRef = this.modalService.open(ModalFeedbackComponent, {
          size: 'md',
          centered: true,
        });
        modalRef.componentInstance.message = 'Nuovo indirizzo inserito!';
        modalRef.componentInstance.isError = false;

        setTimeout(() => {
          this.modalService.dismissAll();
        }, 1000);
      });
  }
}
