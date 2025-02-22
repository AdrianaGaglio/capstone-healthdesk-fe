import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { PatientService } from '../../../services/patient.service';
import { UploadService } from '../../../services/upload.service';
import { AuthService } from '../../../auth/auth.service';
import { iPatient } from '../../../interfaces/ipatientresponse';
import { iAuthupdaterequest } from '../../../interfaces/authupdaterequest';
import { AddressService } from '../../../services/address.service';
import { iProvince } from '../../../interfaces/iprovince';
import { iCity } from '../../../interfaces/icity';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalFeedbackComponent } from '../../../shared/modal-feedback/modal-feedback.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  constructor(
    private authSvc: AuthService,
    private patientSvc: PatientService,
    private addressSvc: AddressService,
    private uploadSvc: UploadService
  ) {}

  private modalService = inject(NgbModal);

  patient!: iPatient;

  edit: boolean = false;

  editLoginInfo: boolean = false;

  showOldPassword: boolean = false;
  showNewPassword: boolean = false;

  @ViewChild('editTaxId') editTaxId!: ElementRef;
  @ViewChild('editAddress') editAddress!: ElementRef;

  selectedFile!: File;

  firstAccess: boolean = false;

  loginUpdate: iAuthupdaterequest = {
    email: '',
    oldPassword: '',
    newPassword: '',
  };

  provinces!: iProvince[];
  cities!: iCity[];

  patientAddress = {
    city: '',
    province: '',
  };

  selectedCity!: iCity;
  selectedProvince!: iProvince;

  ngOnInit() {
    this.getPatient();

    this.addressSvc.getProvinces().subscribe((res) => {
      this.provinces = res;

      this.selectedProvince =
        this.provinces.find((p) => p.name === this.patientAddress.province) ||
        this.provinces[0];

      this.setCity();
    });
  }

  ngAfterViewInit() {
    if (localStorage.getItem('firstAccess') === 'true') {
      this.firstAccess = true;
      let modalRef = this.modalService.open(ModalFeedbackComponent, {
        size: 'md',
        centered: true,
      });
      modalRef.componentInstance.isError = false;
      modalRef.componentInstance.message =
        "Inserisci il tuo codice fiscale e l'indirizzo";

      setTimeout(() => {
        modalRef.close((this.edit = true));
      }, 2000);

      this.editAddress.nativeElement.classList.add('bounce');
      this.editTaxId.nativeElement.classList.add('bounce');
    }
  }

  getPatient() {
    this.authSvc.user$.subscribe((res) => {
      this.patient = res as iPatient;

      if (!this.patient.address) {
        this.patient.address = {
          id: 0,
          street: '',
          streetNumber: '',
          city: '',
          province: '',
          provinceAcronym: '',
          postalCode: '',
        };
      }

      if (this.patient.address) {
        this.patientAddress = {
          city: this.patientAddress.city,
          province: this.patientAddress.province,
        };
      } else {
        this.patientAddress = {
          city: '',
          province: '',
        };
      }
    });
  }

  setCity() {
    if (!this.selectedProvince) return;

    this.patient.address.province = this.selectedProvince.name;
    this.patient.address.provinceAcronym = this.selectedProvince.acronym;

    let provinceName = this.selectedProvince.name;
    this.addressSvc.getCitys(provinceName).subscribe((res) => {
      this.cities = res;

      // Trova la città corrispondente e imposta il valore iniziale
      this.selectedCity =
        this.cities.find((c) => c.name === this.patientAddress.city) ||
        this.cities[0]; // Default alla prima città se non trovata
    });
  }

  selectCity() {
    this.patient.address.city = this.selectedCity.name;
    this.patient.address.postalCode = this.selectedCity.postalCode;
  }

  update(patientId: number, patient: Partial<iPatient>) {
    this.patientSvc.update(patientId, patient).subscribe((res) => {
      this.edit = false;
      this.patient = res;

      if (localStorage.getItem('firstAccess')) {
        this.firstAccess = false;
        localStorage.removeItem('firstAccess');
      }

      const modalRef = this.modalService.open(ModalFeedbackComponent, {
        size: 'md',
        centered: true,
      });
      modalRef.componentInstance.message = 'Modifica avvenuta con successo!';
      modalRef.componentInstance.isError = false;
      setTimeout(() => {
        this.modalService.dismissAll();
      }, 1000);
    });
  }

  updateLoginInfo() {
    this.loginUpdate.email = this.patient.email;
    this.authSvc.updateLoginInfo(this.loginUpdate).subscribe((res) => {
      this.editLoginInfo = false;
      const modalRef = this.modalService.open(ModalFeedbackComponent, {
        size: 'md',
        centered: true,
      });
      modalRef.componentInstance.message = 'Modifica avvenuta con successo!';
      modalRef.componentInstance.isError = false;
      setTimeout(() => {
        this.modalService.dismissAll();
      }, 1000);
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile);
    this.uploadSvc.uploadImage(formData).subscribe((res) => {
      this.patient.avatar = res;
      if (res) {
        this.update(this.patient.id, this.patient);
      }
    });
  }
}
