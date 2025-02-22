import { AppointmentService } from './../../services/appointment.service';
import { Component, inject, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { iAppointmentResponseForCalendar } from '../../interfaces/icalendar';
import { environment } from '../../../environments/environment.development';
import { ModalFeedbackComponent } from '../modal-feedback/modal-feedback.component';
import { Router } from '@angular/router';
import { CalendarService } from '../../services/calendar.service';

@Component({
  selector: 'app-manage-appointment',
  templateUrl: './manage-appointment.component.html',
  styleUrl: './manage-appointment.component.scss',
})
export class ManageAppointmentComponent {
  constructor(
    private appSvc: AppointmentService,
    private router: Router,
    private calendarSvc: CalendarService
  ) {}

  activeModal = inject(NgbActiveModal);
  modalService = inject(NgbModal);

  @Input() appointment!: iAppointmentResponseForCalendar;

  // array per tradurre status
  statuses: { eng: string; it: string }[] = environment.statuses;

  // valori per generare inizio e fine appuntamento
  date: string = '';
  time: string = '';

  today: string = '';

  // controlla se è abilitata la modifica
  edit: boolean = false;

  isPassed: boolean = false;

  // array fasce orarie
  timeRanges: string[] = [];

  // per comunicare esito della modifica
  message: string = '';

  ngOnInit() {
    this.today = new Date().toISOString().split('T')[0];

    if (new Date(this.appointment.startDate) < new Date()) {
      this.isPassed = true;
    }

    // genero i possibili orari
    this.timeRanges = Array.from({ length: 25 }, (_, i) => {
      // a partire dalle 8
      const startHour = 8 + Math.floor(i / 2);
      const startMin = (i % 2) * 30;

      // formatto gli orari generati a 2 cifre
      const format = (num: number) => num.toString().padStart(2, '0');
      // genero ora di inizio
      const startTime = `${format(startHour)}:${format(startMin)}`;

      return `${startTime}`;
    });

    // setto i valori iniziali prendendoli dall'appuntamento
    if (this.appointment) {
      this.date = this.appointment.startDate.slice(0, 10);
      this.time = this.appointment.startDate.slice(11, 16);
    }
  }

  updateAppointment() {
    this.appointment.startDate = `${this.date}T${this.time}:00`;

    // Crea un oggetto Date a partire da startDate
    const endDateObj = new Date(this.appointment.startDate);

    // Aggiungo un’ora
    endDateObj.setHours(endDateObj.getHours() + 2);

    // Converto in stringa (senza “Z” e con data e ora di sistema)
    this.appointment.endDate = endDateObj.toISOString().slice(0, -5);

    // aggiorno l'appuntamento
    this.appSvc.updateAppointment(this.appointment).subscribe((res) => {
      this.calendarSvc.restoreCalendar();
      this.openModal('Appuntamento modificato con successo');
    });
  }

  openModal(message: string) {
    const modalRef = this.modalService.open(ModalFeedbackComponent, {
      centered: true,
      size: 'md',
    });
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.isError = false;
    setTimeout(() => {
      this.modalService.dismissAll();
    }, 1000);
  }
}
