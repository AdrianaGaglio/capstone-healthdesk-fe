import { Component, inject, Input, ViewChild } from '@angular/core';
import { iTraining } from '../../../../../interfaces/itraining';
import { iDoctor } from '../../../../../interfaces/idoctorresponse';
import { NgForm } from '@angular/forms';
import { iDoctorUpdateAddInfo } from '../../../../../interfaces/idoctorupdateaddinfo';
import { iExperience } from '../../../../../interfaces/iexperience';
import { DoctorService } from '../../../../../services/doctor.service';
import { TrainingService } from '../../../../../services/training.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalFeedbackComponent } from '../../../../../shared/modal-feedback/modal-feedback.component';

@Component({
  selector: 'app-trainings',
  templateUrl: './trainings.component.html',
  styleUrl: './trainings.component.scss',
})
export class TrainingsComponent {
  constructor(
    private doctorSvc: DoctorService,
    private trainingSvc: TrainingService
  ) {}

  private modalService = inject(NgbModal);

  @Input() doctor!: iDoctor;

  trainings!: iTraining[];

  @ViewChild('form') form!: NgForm;

  addTraining: boolean = false;

  newTraining: Partial<iTraining> = {};

  ngOnInit() {
    if (this.doctor) {
      this.trainings = this.doctor.trainings;
    }
  }

  createTraining() {
    let request: Partial<iDoctorUpdateAddInfo> = {
      id: this.doctor.id,
      trainings: [],
    };

    this.newTraining.endDate = this.newTraining.endDate
      ? this.newTraining.endDate
      : null;

    request.trainings?.push(this.newTraining);

    this.doctorSvc
      .updateDoctorInfo(this.doctor.id, request)
      .subscribe((res) => {
        this.form.reset();
        this.trainings = res.trainings;
        this.addTraining = false;

        const modalRef = this.modalService.open(ModalFeedbackComponent, {
          size: 'md',
          centered: true,
        });
        modalRef.componentInstance.message =
          'Nuova formazione inserita correttamente!';
        modalRef.componentInstance.isError = false;

        setTimeout(() => {
          this.modalService.dismissAll();
        }, 1000);
      });
  }

  delete(trainingId: number) {
    this.trainingSvc.delete(this.doctor.id, trainingId).subscribe((res) => {
      this.trainings = res.trainings.sort((a, b) => a.id - b.id);

      const modalRef = this.modalService.open(ModalFeedbackComponent, {
        size: 'md',
        centered: true,
      });
      modalRef.componentInstance.message = 'Formazione rimossa correttamente!';
      modalRef.componentInstance.isError = false;

      setTimeout(() => {
        this.modalService.dismissAll();
      }, 1000);
    });
  }
}
