import { Component } from '@angular/core';
import { DoctorService } from '../../services/doctor.service';
import { iDoctor } from '../../interfaces/idoctor';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss',
})
export class ContactsComponent {
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
