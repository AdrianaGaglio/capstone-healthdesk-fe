import { Component, inject } from '@angular/core';
import { DoctorService } from '../../../../../../services/doctor.service';
import { ExperienceService } from '../../../../../../services/experience.service';
import { iDoctor, iExperience } from '../../../../../../interfaces/idoctor';
import { Input } from '@angular/core';
import { iDoctorUpdateAddInfo } from '../../../../../../interfaces/idoctorupdateaddinfo';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-experience',
  templateUrl: './add-experience.component.html',
  styleUrl: './add-experience.component.scss',
})
export class AddExperienceComponent {
  constructor(
    private doctorSvc: DoctorService,
    private experienceSvc: ExperienceService
  ) {}

  @Input() doctor!: iDoctor;

  private activeModal = inject(NgbActiveModal);

  newExperience: Partial<iExperience> = {};

  addExperience() {
    let request: Partial<iDoctorUpdateAddInfo> = {
      id: this.doctor.id,
      experiences: [],
    };

    request.experiences?.push(this.newExperience);

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
