import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { iPatient } from '../../interfaces/ipatient';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { iTiming } from '../../interfaces/itiming';
import { iEvent } from '../../interfaces/ievent';
import {
  iAppointmentResponseForCalendar,
  iCalendar,
} from '../../interfaces/icalendar';
import { CalendarService } from '../../services/calendar.service';
import { CalendarUtilitiesService } from '../../services/calendar-utilities.service';

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrl: './create-booking.component.scss',
})
export class CreateBookingComponent {
  constructor(
    private calendarSvc: CalendarService,
    private utilities: CalendarUtilitiesService
  ) {}

  private activeModal = inject(NgbActiveModal);

  @Input() patient!: iPatient;
  timingFromDoctor!: iTiming;

  calendar!: iCalendar;
  slots!: iEvent[];

  ngOnInit() {
    this.calendarSvc.calendar$.subscribe((calendar) => {
      if (calendar) {
        this.calendar = calendar;
        this.slots = this.utilities
          .generateSlots(calendar.appointments, calendar.days, calendar)
          .filter(
            (slot) => new Date(slot.start).getTime() > new Date().getTime()
          )
          .sort(
            (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime()
          );
      }
    });
  }

  date: string = '';
  time: string = '';

  today: string = '';

  setTime(timing: iTiming) {
    if (!timing.endDate) {
      // Crea un oggetto Date a partire da startDate
      const endDateObj = new Date(timing.startDate!);

      // Aggiungo un’ora
      endDateObj.setHours(endDateObj.getHours() + 2);
      // Converto in stringa (senza “Z” e con data e ora di sistema)
      timing.endDate = endDateObj.toISOString().slice(0, -5);

      this.timingFromDoctor = timing;
    } else {
      this.time = timing.startDate!.split('T')[1].slice(0, 5);
      this.date = timing.startDate!.split('T')[0];
    }
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

  close(appointment: iAppointmentResponseForCalendar | null) {
    this.activeModal.close(appointment);
  }
}
