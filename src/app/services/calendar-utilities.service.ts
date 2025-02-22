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

    // se c'è un periodi di sospensione aggiorno le date
    if (calendar.onHoliday) {
      // converto le date (stringa) in date
      holidayStart = new Date(calendar.holidayDateStart);
      holidayEnd = new Date(calendar.holidayDateEnd);
    }

    // Genero gli slot liberi
    // a partire da 0 (gennaio) fino a 11 (dicembre)
    for (let month = 0; month < 12; month++) {
      // calcolo i giorni del mese che sto ciclando
      let daysInMonth = new Date(year, month + 1, 0).getDate();

      // per ogni giorno del mese
      for (let day = 1; day <= daysInMonth; day++) {
        // ottengo la data a partire da anno, mese e giorno che sto ciclando
        let date = new Date(year, month, day);
        // ottengo il giorno del nome della settimana
        let dayName = daysOfWeek[date.getDay()];
        // controllo se il giorno che sto ciclando è il giorno corrente
        let isToday = date.toDateString() === today.toDateString();

        // per ogni giorno passato come argomento
        days.forEach((activeDay: iActiveDay) => {
          // controllo se è attivo
          if (activeDay.dayName === dayName) {
            activeDay.slots.forEach((slot) => {
              // per ogni giorno ottengo la data formattata (mese e giorno)
              let formattedMonth = (month + 1).toString().padStart(2, '0');
              let formattedDay = day.toString().padStart(2, '0');

              // concateno i dati per ottenere il formato data necessario per creare l'evento
              let slotKey = `${year}-${formattedMonth}-${formattedDay}T${slot.startTime}`;
              let slotDate = new Date(
                `${year}-${formattedMonth}-${formattedDay}`
              );
              let slotDateTime = new Date(
                `${year}-${formattedMonth}-${formattedDay}T${slot.startTime}`
              );

              // controllo se l'utente non è admin o medico e se il giorno corrente non sia un giorno di sospensione
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
                  // controllo inoltre che il time slot che sto ciclando non si passato rispetto al momento attuale
                  let isPastSlot = isToday && slotDateTime < today;
                  // se non ci sono appuntamenti e lo slot non è passato nel tempo
                  if (!bookedSlots.has(slotKey) && !isPastSlot) {
                    // genero l'evento libero per il calendario
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

            // controllo se la giornata ha definito degli extra range orari e ripeto la logica sopra
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
