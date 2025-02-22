import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import {
  iActiveDay,
  iAppointmentResponseForCalendar,
  iCalendar,
} from '../interfaces/icalendar';
import { iEvent } from '../interfaces/ievent';

@Injectable({
  providedIn: 'root',
})
export class CalendarUtilitiesService {
  constructor(private authSvc: AuthService) {}

  generateSlots(
    appointments: iAppointmentResponseForCalendar[],
    days: iActiveDay[],
    calendar: iCalendar
  ): iEvent[] {
    let slots: iEvent[] = [];
    let year = new Date().getFullYear();
    let today = new Date();
    let daysOfWeek = [
      'SUNDAY',
      'MONDAY',
      'TUESDAY',
      'WEDNESDAY',
      'THURSDAY',
      'FRIDAY',
      'SATURDAY',
    ];

    let bookedSlots = new Set<string>();

    // slot appuntamenti
    slots = this.generateAppointmentsSlot(appointments).slots;
    // elenco orari appuntamenti
    bookedSlots = this.generateAppointmentsSlot(appointments).bookedSlots;
    // aggiungo gli slot liberi
    slots = [...slots, ...this.generateFreeSlots(calendar, days, bookedSlots)];

    return slots;
  }

  slotTemplate(
    title: string,
    start: string,
    end: string,
    booked: boolean,
    classNames: string[]
  ): iEvent {
    let newSlot: iEvent = {
      title: title,
      start: start,
      end: end,
      booked: booked,
      classNames: classNames,
      extendedProps: {
        customTooltip: title,
      },
    };
    return newSlot;
  }

  generateAppointmentsSlot(apps: iAppointmentResponseForCalendar[]): {
    slots: iEvent[];
    bookedSlots: Set<string>;
  } {
    {
      // anno corrente
      let year = new Date().getFullYear();
      let slots: iEvent[] = [];
      let bookedSlots = new Set<string>();

      // genero gli slot per gli appuntamenti esistenti
      apps.forEach((appointment) => {
        // data appuntamento
        let appointmentDate = new Date(appointment.startDate);
        // mese dell'appuntamento formattato a numero e in 2 caratteri
        let formattedMonth = (appointmentDate.getMonth() + 1)
          .toString()
          .padStart(2, '0');
        // giorno appuntamento formattato a 2 caratteri
        let formattedDay = appointmentDate
          .getDate()
          .toString()
          .padStart(2, '0');
        // prendo l'ora
        let startTime = appointment.startDate.split('T')[1];

        // genero la data per la creazione dell'evento a calendario concatenando le stringhe
        let slotKey = `${year}-${formattedMonth}-${formattedDay}T${startTime}`;

        // aggiungo la data alla lista degli appuntamenti (mi serve poi per la generazione degli slot liberi)
        bookedSlots.add(slotKey);

        // solo se l'utente è medico o admin creo l'evento per il calendario
        this.authSvc.auth$.subscribe((res) => {
          if (res?.role === 'DOCTOR' || res?.role === 'ADMIN') {
            if (appointment.status !== 'BLOCKED') {
              // aggiungo lo slot prenotato con le sue informazioni
              slots.push(
                this.slotTemplate(
                  appointment.patient.name + ' ' + appointment.patient.surname,
                  appointment.startDate,
                  appointment.endDate,
                  true,
                  ['custom-event', 'booked']
                )
              );
            } else {
              slots.push(
                this.slotTemplate(
                  'BLOCCATO',
                  appointment.startDate,
                  appointment.endDate,
                  true,
                  ['custom-event', 'blocked']
                )
              );
            }
          }
        });
      });

      // ritorno le liste aggiornate
      return {
        slots: slots,
        bookedSlots: bookedSlots,
      };
    }
  }

  generateFreeSlots(
    calendar: iCalendar,
    days: iActiveDay[],
    bookedSlots: Set<string>
  ): iEvent[] {
    let slots: iEvent[] = [];
    let year = new Date().getFullYear();
    let currentMonth = new Date().getMonth(); // Mese corrente (0-11)
    let today = new Date();
    let daysOfWeek = [
      'SUNDAY',
      'MONDAY',
      'TUESDAY',
      'WEDNESDAY',
      'THURSDAY',
      'FRIDAY',
      'SATURDAY',
    ];

    let holidayStart = null;
    let holidayEnd = null;

    // Se c'è un periodo di sospensione aggiorno le date
    if (calendar.onHoliday) {
      holidayStart = new Date(calendar.holidayDateStart);
      holidayEnd = new Date(calendar.holidayDateEnd);
    }

    // Ciclo solo dai mesi dal corrente fino a dicembre
    for (let month = currentMonth; month < 12; month++) {
      let daysInMonth = new Date(year, month + 1, 0).getDate();

      // Se il mese corrente, partiamo dal giorno odierno, altrimenti dal primo giorno
      let startDay = month === currentMonth ? today.getDate() : 1;

      for (let day = startDay; day <= daysInMonth; day++) {
        let date = new Date(year, month, day);
        let dayName = daysOfWeek[date.getDay()];
        let isToday = date.toDateString() === today.toDateString();

        days.forEach((activeDay: iActiveDay) => {
          if (activeDay.dayName === dayName) {
            activeDay.slots.forEach((slot) => {
              let formattedMonth = (month + 1).toString().padStart(2, '0');
              let formattedDay = day.toString().padStart(2, '0');
              let slotKey = `${year}-${formattedMonth}-${formattedDay}T${slot.startTime}`;
              let slotDate = new Date(
                `${year}-${formattedMonth}-${formattedDay}`
              );
              let slotDateTime = new Date(
                `${year}-${formattedMonth}-${formattedDay}T${slot.startTime}`
              );

              this.authSvc.auth$.subscribe((res) => {
                if (
                  !(
                    res?.role !== 'ADMIN' &&
                    res?.role !== 'DOCTOR' &&
                    calendar.onHoliday &&
                    slotDate >= holidayStart! &&
                    slotDate <= holidayEnd!
                  )
                ) {
                  let isPastSlot = isToday && slotDateTime < today;
                  if (!bookedSlots.has(slotKey) && !isPastSlot) {
                    slots.push(
                      this.slotTemplate(
                        '',
                        `${year}-${formattedMonth}-${formattedDay}T${slot.startTime}`,
                        `${year}-${formattedMonth}-${formattedDay}T${slot.endTime}`,
                        false,
                        ['custom-event', 'free']
                      )
                    );
                  }
                }
              });
            });

            if (activeDay.hasExtraRange) {
              activeDay.extraRange.forEach((slot) => {
                let formattedMonth = (month + 1).toString().padStart(2, '0');
                let formattedDay = day.toString().padStart(2, '0');
                let slotKey = `${year}-${formattedMonth}-${formattedDay}T${slot.startTime}`;
                let slotDate = new Date(
                  `${year}-${formattedMonth}-${formattedDay}`
                );

                this.authSvc.auth$.subscribe((res) => {
                  if (
                    !(
                      res?.role !== 'ADMIN' &&
                      res?.role !== 'DOCTOR' &&
                      calendar.onHoliday &&
                      slotDate >= holidayStart! &&
                      slotDate <= holidayEnd!
                    )
                  ) {
                    if (!bookedSlots.has(slotKey)) {
                      slots.push(
                        this.slotTemplate(
                          '',
                          `${year}-${formattedMonth}-${formattedDay}T${slot.startTime}`,
                          `${year}-${formattedMonth}-${formattedDay}T${slot.endTime}`,
                          false,
                          ['custom-event', 'free']
                        )
                      );
                    }
                  }
                });
              });
            }
          }
        });
      }
    }
    return slots;
  }
}
