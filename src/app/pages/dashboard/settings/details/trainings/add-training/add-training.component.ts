import { Component, inject, Input } from '@angular/core';
import { DoctorService } from '../../../../../../services/doctor.service';
import { TrainingService } from '../../../../../../services/training.service';
import { iDoctor, iTraining } from '../../../../../../interfaces/idoctor';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { iDoctorUpdateAddInfo } from '../../../../../../interfaces/idoctorupdateaddinfo';

@Component({
  selector: 'app-add-training',
  templateUrl: './add-training.component.html',
  styleUrl: './add-training.component.scss',
})
export class AddTrainingComponent {
  constructor(
    private doctorSvc: DoctorService,
    private trainingSvc: TrainingService
  ) {}

  @Input() doctor!: iDoctor;

  private activeModal = inject(NgbActiveModal);

  newTraining: Partial<iTraining> = {};

  addTraining() {
    let request: Partial<iDoctorUpdateAddInfo> = {
      id: this.doctor.id,
      trainings: [],
    };

    request.trainings?.push(this.newTraining);

    this.doctorSvc
      .updateDoctorInfo(this.doctor.id, request)
      .subscribe((res) => {
        this.activeModal.close(res);
      });
  }

  close(event: null) {
    this.activeModal.close(event);
  }
}
