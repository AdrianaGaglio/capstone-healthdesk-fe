import { Component, inject, Input } from '@angular/core';
import { iDoctorUpdateAddInfo } from '../../../../../../interfaces/idoctorupdateaddinfo';
import { DoctorService } from '../../../../../../services/doctor.service';
import { iSpecialization } from '../../../../../../interfaces/idoctor';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { iDoctor } from '../../../../../../interfaces/idoctor';
import { SpecializationService } from '../../../../../../services/specialization.service';

@Component({
  selector: 'app-add-specialization',
  templateUrl: './add-specialization.component.html',
  styleUrl: './add-specialization.component.scss',
})
export class AddSpecializationComponent {
  constructor(
    private doctorSvc: DoctorService,
    private specializationSvc: SpecializationService
  ) {}

  private activeModal = inject(NgbActiveModal);

  @Input() doctor!: iDoctor;

  newSpecialization: Partial<iSpecialization> = {};

  addSpecialization() {
    let request: Partial<iDoctorUpdateAddInfo> = {
      id: this.doctor.id,
      specializations: [],
    };

    request.specializations?.push(this.newSpecialization);

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
