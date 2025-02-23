import { Component, inject, Input } from '@angular/core';
import { iDoctor, iExperience } from '../../../../../interfaces/idoctor';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddExperienceComponent } from './add-experience/add-experience.component';
import { ModalFeedbackComponent } from '../../../../../shared/modalfeedback/modalfeedback.component';

@Component({
  selector: 'app-experiences',
  templateUrl: './experiences.component.html',
  styleUrl: './experiences.component.scss',
})
export class ExperiencesComponent {
  @Input() doctor!: iDoctor;
  experiences!: iExperience[];

  private modalService = inject(NgbModal);

  ngOnInit() {
    if (this.doctor) {
      this.experiences = this.doctor.experiences.sort(
        (a, b) =>
          new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
      );
    }
  }

  addExperience() {
    const modalRef = this.modalService.open(AddExperienceComponent, {
      size: 'lg',
      centered: true,
    });
    modalRef.componentInstance.doctor = this.doctor;

    modalRef.result.then((result) => {
      this.doctor = result;
      this.experiences = this.doctor.experiences.sort(
        (a, b) =>
          new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
      );

      if (result) {
        this.feedback('Esperienza aggiunta correttamente');
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

  removeExperience(experience: iExperience) {
    this.experiences = this.experiences.filter((e) => e.id !== experience.id);
  }
}
