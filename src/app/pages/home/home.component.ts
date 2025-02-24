import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../services/doctor.service';
import { iDoctor, iService } from '../../interfaces/idoctor';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  constructor(private doctorSvc: DoctorService, private router: Router) {}

  doctor!: iDoctor;

  services!: iService[];

  ngOnInit() {
    this.doctorSvc.doctor$.subscribe((doctor) => {
      if (doctor) {
        this.doctor = doctor;
        this.services = doctor.services;
      }
    });
  }

  selectService(service: iService) {
    localStorage.setItem('selectedService', JSON.stringify(service));
    this.router.navigate(['/prenota']);
  }
}
