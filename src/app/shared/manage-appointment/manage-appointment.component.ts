import { Component, inject, Input } from '@angular/core';
import { iAppointment } from '../../interfaces/iappointment';
import { iPatient } from '../../interfaces/ipatient';
import { CalendarService } from '../../services/calendar.service';
import {
  iAppointmentResponseForCalendar,
  iCalendar,
  iPatientResponseForCalendar,
} from '../../interfaces/icalendar';
import { CalendarUtilitiesService } from '../../services/calendar-utilities.service';
import { iEvent } from '../../interfaces/ievent';
import { iTiming } from '../../interfaces/itiming';
import { DoctorService } from '../../services/doctor.service';
import { iDoctor } from '../../interfaces/idoctor';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AppointmentService } from '../../services/appointment.service';
import { UtilitiesService } from '../../services/utilities.service';

@Component({
  selector: 'app-manage-appointment',
  templateUrl: './manage-appointment.component.html',
  styleUrl: './manage-appointment.component.scss',
})
export class ManageAppointmentComponent {
  constructor(
    private calendarSvc: CalendarService,
    private calUtilities: CalendarUtilitiesService,
    private doctorSvc: DoctorService,
    private appointmentSvc: AppointmentService,
    private utilities: UtilitiesService
  ) {}

  private activeModal = inject(NgbActiveModal);

  @Input() appointment!: iAppointment;
  calendar!: iCalendar;

  doctor!: iDoctor;

  slots!: iEvent[];

  patient!: iPatient;

  // valori per generare inizio e fine appuntamento
  date: string = '';
  time: string = '';

  today: string = '';

  // controlla se è abilitata la modifica
  edit: boolean = false;

  isPassed: boolean = false;

  addAddress: boolean = false;

  ngOnInit() {
    this.today = new Date().toISOString().split('T')[0];

    this.doctorSvc.doctor$.subscribe((doctor) => {
      if (doctor) {
        this.doctor = doctor;
      }
    });

    this.calendarSvc.calendar$.subscribe((calendar) => {
      if (calendar) {
        this.calendar = calendar;
        this.slots = this.calUtilities
          .generateSlots(calendar.appointments, calendar.days, calendar)
          .filter(
            (slot) => new Date(slot.start).getTime() > new Date().getTime()
          )
          .sort(
            (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime()
          );
      }
    });

    if (new Date(this.appointment.startDate) < new Date()) {
      this.isPassed = true;
    }

    if (this.appointment) {
      this.patient = this.appointment.patient;
    }
  }

  getAvatar(user: iPatient) {
    return this.utilities.getAvatar(user);
  }

  generateTimeSlots(date: string) {
    const day = date.split('T')[0];
    const existingDay = this.calendar.appointments.some(
      (slot) => slot.startDate.split('T')[0] === day
    );

    let unavailableSlots: iEvent[] = [];
    if (existingDay) {
      unavailableSlots = this.slots.filter(
        (slot) => slot.start.split('T')[0] === day && slot.booked
      );
    }

    // Genera tutti i possibili orari a partire dalle 8 in 25 slot (ogni 30 minuti)
    const allTimeSlots = Array.from({ length: 25 }, (_, i) => {
      const startHour = 8 + Math.floor(i / 2);
      const startMin = (i % 2) * 30;
      const format = (num: number) => num.toString().padStart(2, '0');
      return `${format(startHour)}:${format(startMin)}`;
    });

    // se non ci sono slot impegnati per quella data, restituisco tutti
    if (!existingDay || unavailableSlots.length === 0) {
      return allTimeSlots;
    }

    // filtro gli slot escludendo quelli dentro il range impegnato
    return allTimeSlots.filter((time) => {
      // genero la data completa
      const slotDateTime = new Date(`${day}T${time}:00`);
      // controllo se è nel range
      const isUnavailable = unavailableSlots.some((unavSlot) => {
        const unavStart = new Date(unavSlot.start);
        const unavEnd = new Date(unavSlot.end);
        return slotDateTime >= unavStart && slotDateTime < unavEnd;
      });
      return !isUnavailable;
    });
  }

  setStatus(app: iAppointment) {
    return this.utilities.setStatus(app);
  }

  handleAddress() {
    if (this.appointment.online) {
      this.appointment.doctorAddress = null;
      this.addAddress = false;
    } else {
      this.addAddress = true;
    }
  }

  setTime(timing: iTiming) {
    this.appointment.startDate = timing.startDate!;
    this.appointment.endDate = timing.endDate!;

    if (timing.endDate) {
      this.time = timing.startDate!.split('T')[1].slice(0, 5);
      this.date = timing.startDate!.split('T')[0];
    }

    if (!timing.endDate) {
      // Crea un oggetto Date a partire da startDate
      const endDateObj = new Date(this.appointment.startDate);

      // Aggiungo un’ora
      endDateObj.setHours(endDateObj.getHours() + 2);
      // Converto in stringa (senza “Z” e con data e ora di sistema)
      this.appointment.endDate = endDateObj.toISOString().slice(0, -5);

      this.unselect();
    }
  }

  unselect() {
    if (document.querySelector('.selected')) {
      document.querySelector('.selected')?.classList.remove('selected');
    }
  }

  submit() {
    let appointment = (<unknown>(
      this.appointment
    )) as iAppointmentResponseForCalendar;
    this.appointmentSvc.updateAppointment(appointment).subscribe((res) => {
      this.activeModal.close('update');
    });
  }

  cancel() {
    this.appointmentSvc
      .cancelAppointment(this.appointment.id)
      .subscribe((res) => {
        this.activeModal.close('cancel');
      });
  }

  confirm() {
    this.appointmentSvc
      .confirmAppointment(this.appointment.id)
      .subscribe((res) => this.activeModal.close('confirm'));
  }

  close() {
    this.activeModal.close();
  }
}
