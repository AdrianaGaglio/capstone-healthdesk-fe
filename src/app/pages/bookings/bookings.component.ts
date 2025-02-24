import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DoctorService } from '../../services/doctor.service';
import { iDoctor, iService } from '../../interfaces/idoctor';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrl: './bookings.component.scss',
})
export class BookingsComponent implements OnInit {
  constructor(private doctorSvc: DoctorService) {}

  doctor!: iDoctor;
  @ViewChild('addBooking') addBooking!: ElementRef;

  selectedService!: iService;

  ngOnInit() {
    this.doctorSvc.doctor$.subscribe((doctor) => {
      if (doctor) {
        this.doctor = doctor;
      }
    });
  }

  setService(service: iService) {
    this.selectedService = service;

    this.highlight();
  }

  // ngOnChanges() {
  //   if (localStorage.getItem('selectedService')) {
  //     this.selectedService = JSON.parse(
  //       localStorage.getItem('selectedService')!
  //     );
  //     localStorage.removeItem('selectedService');
  //   }
  // }

  // evidenzio il box di prenotazione
  highlight() {
    let bookingForm = this.addBooking.nativeElement.querySelector('form');
    bookingForm.classList.add('bounce');
    setTimeout(() => {
      bookingForm.classList.remove('bounce');
    }, 1000);
  }

  // scorro in fondo alla pagina
  scrollToBottom() {
    window.scrollTo({
      top: document.body.scrollHeight, // Altezza totale della pagina
      behavior: 'smooth', // Scroll fluido
    });
  }
}
