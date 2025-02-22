import { Component, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { iAppointment } from '../../../interfaces/iappointment';
import {
  iCalendar,
  iAppointmentResponseForCalendar,
} from '../../../interfaces/icalendar';
import { AppointmentService } from '../../../services/appointment.service';
import { CalendarService } from '../../../services/calendar.service';
import { PatientService } from '../../../services/patient.service';
import { ManageAppointmentComponent } from '../../../shared/manage-appointment/manage-appointment.component';

@Component({
  selector: 'app-dashboard-calendar',
  templateUrl: './dashboard-calendar.component.html',
  styleUrl: './dashboard-calendar.component.scss',
})
export class DashboardCalendarComponent {
  constructor(
    private patientSvc: PatientService,
    private appSvc: AppointmentService,
    private calendarSvc: CalendarService
  ) {}
  private modalService = inject(NgbModal);

  calendar!: iCalendar;
  appointments!: iAppointment[];

  // elementi per gestire il pageable
  pages: number[] = [];
  currentPage: number = 0;
  size: number = 5;
  totalElements!: number;

  ngOnInit() {
    // // ottengo tutti i pazienti
    // this.patientSvc.getAll().subscribe();

    this.getCalendar();
  }

  getCalendar() {
    this.calendarSvc.calendar$.subscribe((calendar) => {
      if (calendar) {
        this.calendar = calendar;
        // genero la lista dei prossimi appuntamenti
        this.getNextApps();
      }
    });
  }

  // funzione per ottenere la lista dei prossimi appuntamenti
  getNextApps() {
    this.appSvc
      .getNext(this.calendar.id, this.currentPage, this.size)
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
  changePageAndSize() {
    this.appSvc
      .getNext(this.calendar.id, this.currentPage, this.size)
      .subscribe((res) => {
        this.pages = Array.from({ length: res.totalPages }, (_, i) => i);
        this.appointments = res.content.sort(
          (a, b) =>
            new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
        );
      });
  }

  // apro modale per la modifica dell'appuntamento
  manageAppointment(app: iAppointmentResponseForCalendar) {
    const modalRef = this.modalService.open(ManageAppointmentComponent, {
      centered: true,
      size: 'lg',
      scrollable: true,
      ariaLabelledBy: 'modal-basic-title',
    });
    modalRef.componentInstance.appointment = app;

    modalRef.result
      .then((res) => {
        this.calendar = res.calendar;
      })
      .catch((reason) => {
        // Logica in caso di chiusura forzata o errore
        modalRef.close();
      });
  }
}
