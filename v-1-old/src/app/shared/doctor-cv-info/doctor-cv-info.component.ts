import { Component, Input } from '@angular/core';
import { iDoctor } from '../../interfaces/idoctorresponse';

@Component({
  selector: 'app-doctor-cv-info',
  templateUrl: './doctor-cv-info.component.html',
  styleUrl: './doctor-cv-info.component.scss',
})
export class DoctorCvInfoComponent {
  @Input() doctor!: iDoctor;

  count: number = 0;

  moreExperiences: boolean = false;
  moreTrainings: boolean = false;
  moreSpecializations: boolean = false;

  ngOnInit() {
    if (this.doctor) {
      this.count =
        this.doctor.experiences.length +
        this.doctor.trainings.length +
        this.doctor.specializations.length;
    }
  }
}
