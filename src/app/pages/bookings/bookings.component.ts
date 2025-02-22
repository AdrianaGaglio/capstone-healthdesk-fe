import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DoctorService } from '../../services/doctor.service';
import { iDoctor } from '../../interfaces/idoctor';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrl: './bookings.component.scss',
})
export class BookingsComponent implements OnInit {
  constructor(private doctorSvc: DoctorService) {}

  doctor!: iDoctor;
  @ViewChild('addBooking') addBooking!: ElementRef;

  ngOnInit() {
    this.doctorSvc.doctor$.subscribe((doctor) => {
      if (doctor) {
        this.doctor = doctor;
      }
    });
  }

  // evidenzio il box di prenotazione
  highlight() {
    let bookingForm = this.addBooking.nativeElement.querySelector('form');
    bookingForm.classList.add('bounce');
    setTimeout(() => {
      bookingForm.classList.remove('bounce');
    }, 1000);
  }
}
