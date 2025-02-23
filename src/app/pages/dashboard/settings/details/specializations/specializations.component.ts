import { iRegisterRequest } from './../../../../../interfaces/iregisterrequest';
import { DoctorService } from './../../../../../services/doctor.service';
import { Component, inject, Input } from '@angular/core';
import { iDoctor, iSpecialization } from '../../../../../interfaces/idoctor';
import { AddSpecializationComponent } from './add-specialization/add-specialization.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalFeedbackComponent } from '../../../../../shared/modalfeedback/modalfeedback.component';

@Component({
  selector: 'app-specializations',
  templateUrl: './specializations.component.html',
  styleUrl: './specializations.component.scss',
})
export class SpecializationsComponent {
  constructor(private doctorSvc: DoctorService) {}

  @Input() doctor!: iDoctor;
  specializations!: iSpecialization[];

  private modalService = inject(NgbModal);

  ngOnInit() {
    if (this.doctor) {
      this.specializations = this.doctor.specializations.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    }
  }

  addSpecialization() {
    const modalRef = this.modalService.open(AddSpecializationComponent, {
      size: 'lg',
      centered: true,
    });
    modalRef.componentInstance.doctor = this.doctor;

    modalRef.result.then((result) => {
      this.doctor = result;
      this.specializations = this.doctor.specializations.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );

      if (result) {
        this.feedback('Prestazione aggiunta correttamente');
      }
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

  removeSpecialization(specialization: iSpecialization) {
    this.specializations = this.specializations.filter(
      (s) => s.id !== specialization.id
    );
  }
}
