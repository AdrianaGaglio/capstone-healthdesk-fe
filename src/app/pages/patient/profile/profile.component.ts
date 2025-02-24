import { Component, inject } from '@angular/core';
import { ModalFeedbackComponent } from '../../../shared/modalfeedback/modalfeedback.component';
import { iPatient } from '../../../interfaces/ipatient';
import { AuthService } from '../../../auth/auth.service';
import { PatientService } from '../../../services/patient.service';
import { UploadService } from '../../../services/upload.service';
import { UtilitiesService } from '../../../services/utilities.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { iCity, iProvince } from '../../../interfaces/iaddress';
import { AddressService } from '../../../services/address.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  constructor(
    private authSvc: AuthService,
    private patientSvc: PatientService,
    private uploadSvc: UploadService,
    private utilities: UtilitiesService,
    private addressSvc: AddressService
  ) {}

  private modalService = inject(NgbModal);

  patient!: iPatient;

  selectedFile!: File;

  edit: boolean = false;

  firstAccess: boolean = false;

  provinces!: iProvince[];
  cities!: iCity[];

  patientAddress = {
    city: '',
    province: '',
  };

  selectedCity!: iCity;
  selectedProvince!: iProvince;

  ngOnInit() {
    this.authSvc.user$.subscribe((user) => {
      this.patient = user as iPatient;
    });

    this.addressSvc.getProvinces().subscribe((res) => {
      this.provinces = res;

      this.selectedProvince =
        this.provinces.find((p) => p.name === this.patientAddress.province) ||
        this.provinces[0];

      this.setCity();
    });
  }

  getAvatar() {
    return this.utilities.getAvatar(this.patient);
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile);
    this.uploadSvc.uploadImage(formData).subscribe((res: string) => {
      this.patient.avatar = res;
      if (res) {
        this.update(this.patient.id, this.patient);
      }
    });
  }

  update(patientId: number, patient: Partial<iPatient>) {
    this.patientSvc.update(patientId, patient).subscribe((res: iPatient) => {
      this.edit = false;
      this.patient = res;

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

  feedback(message: string) {
    const modalRef = this.modalService.open(ModalFeedbackComponent, {
      size: 'md',
      centered: true,
    });
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.isError = false;

    setTimeout(() => {
      this.modalService.dismissAll();
    }, 1000);
  }
}
