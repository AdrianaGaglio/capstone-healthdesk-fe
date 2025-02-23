import { Component, inject } from '@angular/core';
import { AuthService } from '../../../../auth/auth.service';
import { DoctorService } from '../../../../services/doctor.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { iDoctor } from '../../../../interfaces/idoctor';
import { UploadService } from '../../../../services/upload.service';
import { ModalFeedbackComponent } from '../../../../shared/modalfeedback/modalfeedback.component';
import { UtilitiesService } from '../../../../services/utilities.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent {
  constructor(
    private authSvc: AuthService,
    private doctorSvc: DoctorService,
    private uploadSvc: UploadService,
    private utilities: UtilitiesService
  ) {}

  private modalService = inject(NgbModal);

  doctor!: iDoctor;

  selectedFile!: File;

  edit: boolean = false;

  ngOnInit() {
    this.authSvc.user$.subscribe((user) => {
      this.doctor = user as iDoctor;
    });
  }

  getAvatar() {
    return this.utilities.getAvatar(this.doctor);
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

  update(doctorId: number, doctor: iDoctor) {
    this.doctorSvc
      .updateDoctorPersonalInfo(doctorId, doctor)
      .subscribe((res) => {
        this.doctor = res;
        this.edit = false;
        this.feedback('Modifiche salvate correttamente');
      });
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
