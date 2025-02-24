import { Component } from '@angular/core';
import { DoctorService } from '../../services/doctor.service';
import { iDoctor } from '../../interfaces/idoctor';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {
  constructor(private doctorSvc: DoctorService) {}

  doctor!: iDoctor;

  ngOnInit() {
    this.doctorSvc.doctor$.subscribe((doctor) => {
      if (doctor) {
        this.doctor = doctor;
      }
    });
  }
}
