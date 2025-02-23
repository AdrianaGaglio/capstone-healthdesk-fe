import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { iDoctor, iExperience } from '../../../../../../interfaces/idoctor';
import { ExperienceService } from '../../../../../../services/experience.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalFeedbackComponent } from '../../../../../../shared/modalfeedback/modalfeedback.component';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss',
})
export class ExperienceComponent {
  constructor(private experienceSvc: ExperienceService) {}

  @Input() doctor!: iDoctor;
  @Input() experience!: iExperience;

  private modalService = inject(NgbModal);

  @Output() onDelete = new EventEmitter<iExperience>();

  delete(experienceId: number) {
    this.experienceSvc.delete(this.doctor.id, experienceId).subscribe((res) => {
      this.onDelete.emit(this.experience);
      this.feedback('Esperienza professionale rimossa correttamente');
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
