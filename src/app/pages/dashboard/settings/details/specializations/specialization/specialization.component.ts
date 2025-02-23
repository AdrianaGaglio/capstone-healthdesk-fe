import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { iDoctor, iSpecialization } from '../../../../../../interfaces/idoctor';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalFeedbackComponent } from '../../../../../../shared/modalfeedback/modalfeedback.component';
import { SpecializationService } from '../../../../../../services/specialization.service';

@Component({
  selector: 'app-specialization',
  templateUrl: './specialization.component.html',
  styleUrl: './specialization.component.scss',
})
export class SpecializationComponent {
  constructor(private specializationSvc: SpecializationService) {}

  @Input() specialization!: iSpecialization;
  @Input() doctor!: iDoctor;

  private modalService = inject(NgbModal);

  @Output() onDelete = new EventEmitter<iSpecialization>();

  delete(specializationId: number) {
    this.specializationSvc
      .delete(this.doctor.id, specializationId)
      .subscribe((res) => {
        this.onDelete.emit(this.specialization);
        this.feedback('Specializzazione rimossa correttamente');
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
