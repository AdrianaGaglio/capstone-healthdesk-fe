import { Component, inject, Input, ViewChild } from '@angular/core';
import { iExperience } from '../../../../../interfaces/iexperience';
import { NgForm } from '@angular/forms';
import { iDoctor } from '../../../../../interfaces/idoctorresponse';
import { iDoctorUpdateAddInfo } from '../../../../../interfaces/idoctorupdateaddinfo';
import { iSpecialization } from '../../../../../interfaces/ispecialization';
import { DoctorService } from '../../../../../services/doctor.service';
import { ExperienceService } from '../../../../../services/experience.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalFeedbackComponent } from '../../../../../shared/modal-feedback/modal-feedback.component';

@Component({
  selector: 'app-experiences',
  templateUrl: './experiences.component.html',
  styleUrl: './experiences.component.scss',
})
export class ExperiencesComponent {
  constructor(
    private doctorSvc: DoctorService,
    private experienceSvc: ExperienceService
  ) {}

  private modalService = inject(NgbModal);

  @Input() doctor!: iDoctor;

  experiences!: iExperience[];

  @ViewChild('form') form!: NgForm;

  addExperience: boolean = false;

  newExperience: Partial<iExperience> = {};

  ngOnInit() {
    if (this.doctor) {
      this.experiences = this.doctor.experiences;
    }
  }

  createExperience() {
    let request: Partial<iDoctorUpdateAddInfo> = {
      id: this.doctor.id,
      experiences: [],
    };

    this.newExperience.endDate = this.newExperience.endDate
      ? this.newExperience.endDate
      : null;
    request.experiences?.push(this.newExperience);

    this.doctorSvc
      .updateDoctorInfo(this.doctor.id, request)
      .subscribe((res) => {
        this.form.reset();
        this.experiences = res.experiences;
        this.addExperience = false;

        const modalRef = this.modalService.open(ModalFeedbackComponent, {
          size: 'md',
          centered: true,
        });
        modalRef.componentInstance.message =
          'Nuova esperienza inserita correttamente!';
        modalRef.componentInstance.isError = false;

        setTimeout(() => {
          this.modalService.dismissAll();
        }, 1000);
      });
  }

  delete(experienceId: number) {
    this.experienceSvc.delete(this.doctor.id, experienceId).subscribe((res) => {
      this.experiences = res.experiences.sort((a, b) => a.id - b.id);

      const modalRef = this.modalService.open(ModalFeedbackComponent, {
        size: 'md',
        centered: true,
      });
      modalRef.componentInstance.message = 'Esperienza rimossa correttamente!';
      modalRef.componentInstance.isError = false;

      setTimeout(() => {
        this.modalService.dismissAll();
      }, 1000);
    });
  }
}
