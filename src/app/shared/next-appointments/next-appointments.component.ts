import { Component, Input, Output } from '@angular/core';
import { iAppointment } from '../../interfaces/iappointment';
import {
  iAppointmentResponseForCalendar,
  iCalendar,
} from '../../interfaces/icalendar';
import { AppointmentService } from '../../services/appointment.service';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-next-appointments',
  templateUrl: './next-appointments.component.html',
  styleUrl: './next-appointments.component.scss',
})
export class NextAppointmentsComponent {
  constructor(private appointmentSvc: AppointmentService) {}

  appointments!: iAppointment[];
  @Input() calendar!: iCalendar;

  @Output() onAppointmentSelected =
    new EventEmitter<iAppointmentResponseForCalendar>();

  // elementi per gestire il pageable
  pages: number[] = [];
  currentPage: number = 0;
  size: number = 4;
  totalElements!: number;

  ngOnInit() {
    this.getNextAppointments();
  }

  // funzione per ottenere la lista dei prossimi appuntamenti
  getNextAppointments() {
    this.appointmentSvc
      .getNextAppointments(this.calendar.id, this.currentPage, this.size)
      .subscribe((res) => {
        this.appointments = res.content
          .sort(
            (a, b) =>
              new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
          )
          .filter((a) => a.status != 'CANCELLED');
        this.totalElements = res.totalElements;
        this.pages = Array.from({ length: res.totalPages }, (_, i) => i);
        this.currentPage = this.pages[0];
      });
  }

  // funzione per cambiare la pagina e numero di elementi
  changePageAndSize(page: number) {
    this.appointmentSvc
      .getNextAppointments(this.calendar.id, page, this.size)
      .subscribe((res) => {
        this.pages = Array.from({ length: res.totalPages }, (_, i) => i);
        this.appointments = res.content.sort(
          (a, b) =>
            new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
        );
        this.currentPage = res.pageable.pageNumber;
      });
  }

  emitAppointment(appointment: iAppointment) {
    this.onAppointmentSelected.emit(appointment);
  }
}
