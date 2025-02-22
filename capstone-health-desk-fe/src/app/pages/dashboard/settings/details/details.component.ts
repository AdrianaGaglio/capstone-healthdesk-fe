import { iAuthupdaterequest } from './../../../../interfaces/authupdaterequest';
import { Component, inject } from '@angular/core';
import { DoctorService } from '../../../../services/doctor.service';
import { AuthService } from '../../../../auth/auth.service';
import { iDoctor } from '../../../../interfaces/idoctorresponse';
import { UploadService } from '../../../../services/upload.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalFeedbackComponent } from '../../../../shared/modal-feedback/modal-feedback.component';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent {
  constructor(
    private authSvc: AuthService,
    private doctorSvc: DoctorService,
    private uploadSvc: UploadService
  ) {}

  private modalService = inject(NgbModal);

  doctor!: iDoctor;

  edit: boolean = false;

  editLoginInfo: boolean = false;

  showOldPassword: boolean = false;
  showNewPassword: boolean = false;

  isAdmin: boolean = false;

  selectedFile!: File;

  loginUpdate: iAuthupdaterequest = {
    email: '',
    oldPassword: '',
    newPassword: '',
  };

  ngOnInit() {
    this.doctorSvc.doctor$.subscribe((doctor) => {
      this.doctor = doctor!;
    });
  }

  update(doctorId: number, doctor: iDoctor) {
    this.doctorSvc.updatePersonalInfo(doctorId, doctor).subscribe((res) => {
      this.edit = false;
      this.doctor = res;

      const modalRef = this.modalService.open(ModalFeedbackComponent, {
        size: 'md',
        centered: true,
      });
      modalRef.componentInstance.message = 'Modifiche salvate correttamente!';
      modalRef.componentInstance.isError = false;

      setTimeout(() => {
        this.modalService.dismissAll();
      }, 1000);
    });
  }

  updateLoginInfo() {
    this.loginUpdate.email = this.doctor.email;

    this.authSvc.updateLoginInfo(this.loginUpdate).subscribe((res) => {
      this.editLoginInfo = false;

      const modalRef = this.modalService.open(ModalFeedbackComponent, {
        size: 'md',
        centered: true,
      });
      modalRef.componentInstance.message = 'Modifiche salvate correttamente!';
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
      this.doctor.avatar = res;
      if (res) {
        this.update(this.doctor.id, this.doctor);
      }
    });
  }
}
