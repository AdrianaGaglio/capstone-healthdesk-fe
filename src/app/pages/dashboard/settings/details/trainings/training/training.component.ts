import { Component, EventEmitter, inject, Input, Output } from '@angular/core';

import { iDoctor, iTraining } from '../../../../../../interfaces/idoctor';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TrainingService } from '../../../../../../services/training.service';
import { ModalFeedbackComponent } from '../../../../../../shared/modalfeedback/modalfeedback.component';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrl: './training.component.scss',
})
export class TrainingComponent {
  constructor(private trainingSvc: TrainingService) {}
  @Input() doctor!: iDoctor;
  @Input() training!: iTraining;

  private modalService = inject(NgbModal);

  @Output() onDelete = new EventEmitter<iTraining>();

  delete(trainingId: number) {
    this.trainingSvc.delete(this.doctor.id, trainingId).subscribe((res) => {
      this.onDelete.emit(this.training);
      this.feedback('Formazione rimossa correttamente');
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
