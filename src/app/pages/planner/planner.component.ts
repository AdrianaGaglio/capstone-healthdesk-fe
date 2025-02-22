import { LayoutService } from './../../services/layout.service';
import {
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CalendarService } from '../../services/calendar.service';
import { iCalendar } from '../../interfaces/icalendar';
import { AuthService } from '../../auth/auth.service';
import { iDoctor } from '../../interfaces/idoctorresponse';
import { DoctorService } from '../../services/doctor.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { combineLatest, forkJoin } from 'rxjs';
import { iAppointmentRequest } from '../../interfaces/iappointment';
import { iService } from '../../interfaces/iservice';
import { iTiming } from '../../interfaces/itiming';

@Component({
  selector: 'app-planner',
  templateUrl: './planner.component.html',
  styleUrl: './planner.component.scss',
})
export class PlannerComponent implements OnInit {
  constructor(
    private calendarSvc: CalendarService,
    private authSvc: AuthService,
    private doctorSvc: DoctorService,
    private layoutSvc: LayoutService
  ) {}

  @ViewChild('addBooking') addBooking!: ElementRef;

  calendar!: iCalendar;
  doctor!: iDoctor;

  isDoctor: boolean = false;

  timing: iTiming = {
    startDate: '',
    endDate: '',
  };

  selectedService!: iService;

  isMobile: boolean = false;

  ngOnInit() {
    combineLatest([
      this.layoutSvc.getLayoutMax990(),
      this.calendarSvc.calendar$,
      this.doctorSvc.doctor$,
    ]).subscribe(([isMobile, calendar, doctor]) => {
      this.isMobile = isMobile;
      if (calendar) {
        this.calendar = calendar;
        console.log(this.calendar);
      }
      if (doctor) {
        this.doctor = doctor;
      }
    });
  }

  // prendo gli orari dell'appuntamento emessi dal calendario
  getTiming(timing: iTiming) {
    this.timing.startDate = timing.startDate;
    this.timing.endDate = timing.endDate;
  }

  // evidenzio il box di prenotazione
  highlight() {
    let bookingForm = this.addBooking.nativeElement.querySelector('form');
    bookingForm.classList.add('bounce');
    setTimeout(() => {
      bookingForm.classList.remove('bounce');
    }, 1000);
    this.scrollToBottom();
  }

  // preseleziono il servizio nel box di prenotazione
  setService(service: iService) {
    this.selectedService = service;
    this.highlight();
  }

  // scorro in fondo alla pagina
  scrollToBottom() {
    if (this.isMobile) {
      window.scrollTo({
        top: document.body.scrollHeight, // Altezza totale della pagina
        behavior: 'smooth', // Scroll fluido
      });
    }
  }

  hasAdditionalInfo() {
    return (
      this.doctor.experiences.length > 0 ||
      this.doctor.specializations.length > 0 ||
      this.doctor.trainings.length > 0 ||
      this.doctor.trainings.length > 0
    );
  }
}
