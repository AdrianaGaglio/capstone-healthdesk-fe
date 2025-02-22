import { Component, inject, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppointmentService } from '../../services/appointment.service';
import { iPatient } from '../../interfaces/ipatientresponse';
import { CalendarService } from '../../services/calendar.service';
import {
  iAppointmentResponseForCalendar,
  iCalendar,
} from '../../interfaces/icalendar';
import { DoctorService } from '../../services/doctor.service';
import { AuthService } from '../../auth/auth.service';
import { iDoctor } from '../../interfaces/idoctorresponse';
import { iTiming } from '../../interfaces/itiming';
import { ModalFeedbackComponent } from '../modal-feedback/modal-feedback.component';

@Component({
  selector: 'app-create-appointment',
  templateUrl: './create-appointment.component.html',
  styleUrl: './create-appointment.component.scss',
})
export class CreateAppointmentComponent {
  constructor(
    private authSvc: AuthService,
    private calendarSvc: CalendarService
  ) {}

  activeModal = inject(NgbActiveModal);
  modalService = inject(NgbModal);

  @Input() patient!: iPatient;

  today: string = '';

  calendar!: iCalendar;
  doctor!: iDoctor;

  timing: iTiming = {
    startDate: '',
    endDate: '',
  };

  manualDate: boolean = false;

  // valori per generare inizio e fine appuntamento manuale
  date: string = '';
  time: string = '';

  // array fasce orarie
  timeRanges: string[] = [];

  ngOnInit() {
    this.today = new Date().toISOString().split('T')[0];

    // recupero il medico
    this.authSvc.user$.subscribe((res) => (this.doctor = res as iDoctor));
    // recupero il calendario
    this.calendarSvc.getCalendar().subscribe((res) => {
      this.calendar = res;
    });

    // genero i possibili orari per selezione manuale
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
  }

  setTiming() {
    if (this.time && this.date) {
      let startDate = `${this.date}T${this.time}:00`;
      // Crea un oggetto Date a partire da startDate
      const endDateObj = new Date(startDate);

      // Aggiungo un’ora
      endDateObj.setHours(endDateObj.getHours() + 2);

      let endDate = endDateObj.toISOString().slice(0, -5);

      this.timing = {
        startDate: startDate,
        endDate: endDate,
      };
    }
  }

  // setto inizio e fine appuntamento
  getTiming(timing: iTiming) {
    this.timing.startDate = timing.startDate;
    this.timing.endDate = timing.endDate;
  }

  // recupero
  onAppointmentCreated(app: iAppointmentResponseForCalendar) {
    setTimeout(() => {
      this.activeModal.close(app); // qui recuperare l'appuntamento
    }, 300);
    let message = 'Appuntamento inserito correttamente';
    const modalRef = this.modalService.open(ModalFeedbackComponent, {
      size: 'md',
      centered: true,
    });
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.isError = false;
    setTimeout(() => {
      this.modalService.dismissAll();
    }, 1000);
  }
}
