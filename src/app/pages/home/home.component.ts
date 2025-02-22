import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../services/doctor.service';
import { iDoctor } from '../../interfaces/idoctor';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  constructor(private doctorSvc: DoctorService) {}

  doctor!: iDoctor;

  ngOnInit() {
    this.doctorSvc.doctor$.subscribe((doctor) => {
      if (doctor) {
        this.doctor = doctor;
        console.log(this.doctor);
      }
    });
  }
}
