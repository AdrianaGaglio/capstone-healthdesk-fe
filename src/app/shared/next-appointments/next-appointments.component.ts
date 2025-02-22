import { Component, Input, Output } from '@angular/core';
import { iAppointment } from '../../interfaces/iappointment';
import {
  iAppointmentResponseForCalendar,
  iCalendar,
} from '../../interfaces/icalendar';
import { AppointmentService } from '../../services/appointment.service';
import { EventEmitter } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { UtilitiesService } from '../../services/utilities.service';
import { filter } from 'rxjs';
import { CalendarService } from '../../services/calendar.service';

@Component({
  selector: 'app-next-appointments',
  templateUrl: './next-appointments.component.html',
  styleUrl: './next-appointments.component.scss',
})
export class NextAppointmentsComponent {
  constructor(
    private appointmentSvc: AppointmentService,
    private utilities: UtilitiesService,
    private calendarSvc: CalendarService
  ) {}

  appointments!: iAppointment[];
  calendar!: iCalendar;

  @Output() onAppointmentSelected = new EventEmitter<iAppointment>();

  // elementi per gestire il pageable
  pages: number[] = [];
  currentPage: number = 0;
  size: number = 3;
  totalElements!: number;

  ngOnInit() {
    this.calendarSvc.calendar$.subscribe((calendar) => {
      if (calendar) {
        this.calendar = calendar;

        this.getNextAppointments();
      }
    });
  }

  // funzione per ottenere la lista dei prossimi appuntamenti
  getNextAppointments() {
    this.appointmentSvc
      .getNextAppointments(this.calendar.id, this.currentPage, this.size)
      .subscribe((res) => {
        this.appointments = res.content.sort(
          (a, b) =>
            new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
        );
        console.log(res);
        this.totalElements = res.totalElements;
        this.pages = Array.from({ length: res.totalPages }, (_, i) => i);
        this.currentPage = this.pages[0];
      });
  }

  setStatus(app: iAppointment) {
    return this.utilities.setStatus(app);
  }

  // funzione per cambiare la pagina e numero di elementi
  changePageAndSize(page: number) {
    this.appointmentSvc
      .getNextAppointments(this.calendar.id, page, this.size)
      .subscribe((res) => {
        this.pages = Array.from({ length: res.totalPages }, (_, i) => i);
        this.currentPage = res.pageable.pageNumber;
        this.appointments = res.content.sort(
          (a, b) =>
            new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
        );
      });
  }

  emitAppointment(appointment: iAppointment) {
    this.onAppointmentSelected.emit(appointment);
  }
}
