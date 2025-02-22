import { Component, inject, Input, ViewChild } from '@angular/core';
import { iSpecialization } from '../../../../../interfaces/ispecialization';
import { iDoctorUpdateAddInfo } from '../../../../../interfaces/idoctorupdateaddinfo';
import { DoctorService } from '../../../../../services/doctor.service';
import { iDoctor } from '../../../../../interfaces/idoctorresponse';
import { NgForm } from '@angular/forms';
import { SpecializationService } from '../../../../../services/specialization.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalFeedbackComponent } from '../../../../../shared/modal-feedback/modal-feedback.component';

@Component({
  selector: 'app-specializations',
  templateUrl: './specializations.component.html',
  styleUrl: './specializations.component.scss',
})
export class SpecializationsComponent {
  constructor(
    private doctorSvc: DoctorService,
    private specializationSvc: SpecializationService
  ) {}

  private modalService = inject(NgbModal);

  @Input() doctor!: iDoctor;

  specializations!: iSpecialization[];

  @ViewChild('form') form!: NgForm;

  addSpecialization: boolean = false;

  newSpecialization: Partial<iSpecialization> = {};

  ngOnInit() {
    if (this.doctor) {
      this.specializations = this.doctor.specializations;
    }
  }

  createSpecialization() {
    let request: Partial<iDoctorUpdateAddInfo> = {
      id: this.doctor.id,
      specializations: [],
    };

    request.specializations?.push(this.newSpecialization);

    this.doctorSvc
      .updateDoctorInfo(this.doctor.id, request)
      .subscribe((res) => {
        this.form.reset();
        this.specializations = res.specializations;
        this.addSpecialization = false;

        const modalRef = this.modalService.open(ModalFeedbackComponent, {
          size: 'md',
          centered: true,
        });
        modalRef.componentInstance.message =
          'Nuova specializzazione inserita correttamente!';
        modalRef.componentInstance.isError = false;

        setTimeout(() => {
          this.modalService.dismissAll();
        }, 1000);
      });
  }

  delete(specializationId: number) {
    this.specializationSvc
      .delete(this.doctor.id, specializationId)
      .subscribe((res) => {
        this.specializations = res.specializations.sort((a, b) => a.id - b.id);

        const modalRef = this.modalService.open(ModalFeedbackComponent, {
          size: 'md',
          centered: true,
        });
        modalRef.componentInstance.message =
          'Specializzazione rimossa correttamente!';
        modalRef.componentInstance.isError = false;

        setTimeout(() => {
          this.modalService.dismissAll();
        }, 1000);
      });
  }
}
