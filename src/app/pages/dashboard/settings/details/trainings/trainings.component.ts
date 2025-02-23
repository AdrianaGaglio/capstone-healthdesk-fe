import { Component, inject, Input } from '@angular/core';
import { iDoctor, iTraining } from '../../../../../interfaces/idoctor';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalFeedbackComponent } from '../../../../../shared/modalfeedback/modalfeedback.component';
import { AddTrainingComponent } from './add-training/add-training.component';

@Component({
  selector: 'app-trainings',
  templateUrl: './trainings.component.html',
  styleUrl: './trainings.component.scss',
})
export class TrainingsComponent {
  @Input() doctor!: iDoctor;
  trainings!: iTraining[];

  private modalService = inject(NgbModal);

  ngOnInit() {
    if (this.doctor) {
      this.trainings = this.doctor.trainings.sort(
        (a, b) =>
          new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
      );
    }
  }

  addTraining() {
    const modalRef = this.modalService.open(AddTrainingComponent, {
      size: 'lg',
      centered: true,
    });
    modalRef.componentInstance.doctor = this.doctor;

    modalRef.result.then((result) => {
      this.doctor = result;
      this.trainings = this.doctor.trainings.sort(
        (a, b) =>
          new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
      );

      if (result) {
        this.feedback('Formazione aggiunta correttamente');
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

  removeTraining(training: iTraining) {
    this.trainings = this.trainings.filter((t) => t.id !== training.id);
  }
}
