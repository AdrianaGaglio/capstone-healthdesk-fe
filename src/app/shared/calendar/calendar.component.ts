import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  CalendarOptions,
  DayCellMountArg,
  EventClickArg,
} from '@fullcalendar/core/index.js';
import { iEvent } from '../../interfaces/ievent';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import {
  iActiveDay,
  iAppointmentResponseForCalendar,
  iCalendar,
} from '../../interfaces/icalendar';
import { AuthService } from '../../auth/auth.service';
import { CalendarUtilitiesService } from '../../services/calendar-utilities.service';
import { iTiming } from '../../interfaces/itiming';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
})
export class CalendarComponent implements OnInit, OnChanges {
  constructor(
    private authSvc: AuthService,
    private utilities: CalendarUtilitiesService
  ) {}

  private activeModal = inject(NgbActiveModal);

  slots: iEvent[] = [];
  days!: iActiveDay[];

  @Input() calendar!: iCalendar;

  // per gestire le opzioni del calendario in maniera dinamica
  @Input() slotMinTime!: string;
  @Input() slotMaxTime!: string;
  @Input() height!: number;
  @Input() filterForDoctor: string = 'prev,next';

  @Output() onTimeSelect = new EventEmitter<iTiming>(); // emetto gli orari dello slot selezionato
  @Output() onUnlockSlot = new EventEmitter<number>(); // emetto l'id dello slot da sbloccare
  @Output() onAppointmentSelect =
    new EventEmitter<iAppointmentResponseForCalendar>();

  calendarOptions: CalendarOptions = {
    plugins: [
      dayGridPlugin,
      timeGridPlugin,
      interactionPlugin,
      bootstrap5Plugin,
    ],
    initialView: 'timeGridWeek', // visuale settimanale con slot orari
    themeSystem: 'bootstrap5', // stile
    height: this.height || 'auto',
    buttonText: {
      today: 'Oggi', // testo pulsante "today"
      prev: '⮜',
      next: '⮞',
      dayGridMonth: 'Mese',
      timeGridWeek: 'Settimana',
    },
    initialDate: new Date().toISOString().split('T')[0],
    headerToolbar: {
      // definizione degli elementi della toolbar
      left: 'title',
      right: 'prev,next',
    },
    locale: 'it', // lingua
    slotDuration: '00:30:00', // durata degli slot
    slotMinTime: this.slotMinTime || '16:00:00', // orario di inizio giornata
    slotMaxTime: this.slotMaxTime || '20:00:00', // orario di fine giornata
    expandRows: true, // espande le righe per occupare lo spazio a disposizione
    slotLabelFormat: {
      // formattazione degli orari
      hour: '2-digit',
      minute: '2-digit',
      omitZeroMinute: false,
      meridiem: false,
      timeZone: '',
    },
    dayCellDidMount: (info) => this.slotLabelDidMount(info),
    allDaySlot: false, // nasconde lo slot "tutta la giornata"
    weekends: false, // disabilita i weekend
    eventClick: (arg) => this.handleEventClick(arg),
    events: this.slots, // lista eventi, in questo caso gli slot disponibili
    eventDidMount: function (info) {
      info.el.setAttribute('title', info.event.extendedProps['customTooltip']);
    },
  };

  ngOnInit() {
    if (this.calendar) {
      this.loadCalendar();
    }
  }

  loadCalendar() {
    this.days = [];
    // ottengo la lista dei giorni filtrati in base a quelli attivi
    this.days = this.calendar.days.filter((d) => d.isActive);
    // ordino gli slot per orario
    this.days.forEach(
      (day: iActiveDay) =>
        (day.slots = day.slots.sort(
          (a, b) =>
            new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
        ))
    );

    this.generateSlots();
  }

  // genero gli slot da mostrare a calendario
  generateSlots() {
    this.utilities
      .generateSlots(this.calendar.appointments, this.days, this.calendar)
      .forEach((s) => this.slots.push(s));

    // trovo la prima data disponibile negli slot a partire da oggi
    const firstAvailableSlot = this.slots
      .map((slot) => new Date(slot.start))
      .filter((date) => date >= new Date()) // Filtra solo le date future o uguali a oggi
      .sort((a, b) => a.getTime() - b.getTime())[0]; // Ordina e prendi la prima

    // se l'utente è un paziente, la imposto per bloccare il calendario
    if (
      this.authSvc.auth$.getValue()?.role !== 'DOCTOR' &&
      this.authSvc.auth$.getValue()?.role !== 'ADMIN'
    ) {
      this.calendarOptions = {
        ...this.calendarOptions,
        validRange: {
          start: firstAvailableSlot.toISOString().split('T')[0],
        },
      };
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    // ❗TO-DO: implementazione per il medico
    // if (this.authSvc.auth$.getValue()?.role !== 'DOCTOR') {
    //   this.calendarOptions = {
    //     ...this.calendarOptions,
    //     validRange: {
    //       // mostra il calendario a partire dalla settimana corrente
    //       start: new Date().toISOString().split('T')[0], // Imposta la data di inizio alla settimana corrente
    //     },
    //   };
    // }

    this.calendarOptions = {
      ...this.calendarOptions,
      slotMinTime: this.slotMinTime,
      slotMaxTime: this.slotMaxTime,
      height: this.height,
      headerToolbar: {
        left: 'title',
        right: this.filterForDoctor ? this.filterForDoctor : 'prev,next',
      },
    };
  }

  slotLabelDidMount(info: DayCellMountArg) {}

  handleEventClick(arg: EventClickArg) {
    let startDate = new Date(arg.event.start!);
    let endDate = new Date(arg.event.end!);

    // seleziono elemento nel DOM
    let event = arg.jsEvent.target as HTMLElement;
    event = event.closest('a') as HTMLElement;

    // aggiungo un'ora (al click di default seleziona un'ora indietro)
    startDate.setHours(startDate.getHours() + 1);
    endDate.setHours(endDate.getHours() + 1);

    // riconverto in stringa
    let startDateString = startDate.toISOString().slice(0, -5);
    let endDateString = endDate.toISOString().slice(0, -5);

    let timing = {
      startDate: startDateString,
      endDate: endDateString,
    };

    // controllo se per la data selezionata c'è un appuntamento
    let app = this.calendar.appointments.find(
      (app: iAppointmentResponseForCalendar) =>
        app.startDate === startDateString
    );

    this.authSvc.auth$.subscribe((auth) => {
      if (auth && auth.role === 'DOCTOR') {
        if (app) {
          // se il medico clicca su un appuntamento
          if (app.status !== 'BLOCKED') {
            // emette l'appuntamento per la gestione
            this.onAppointmentSelect.emit(app);
          } else {
            // sblocca lo slot bloccato
            this.onUnlockSlot.emit(app.id);
          }
        } else {
          // se invece clicca su uno slot libero
          let isPassed = startDate.getTime() >= Date.now(); // controllo se la data selezionata e' passata
          if (!isPassed) {
            this.onTimeSelect.emit(timing);
            this.selectSlot(event);
          }
        }
      } else if ((!auth || auth.role !== 'ADMIN') && !app) {
        // se è un paziente (loggato o non) e lo slot è libero

        this.selectSlot(event);

        this.onTimeSelect.emit(timing);
        // serve per quanto il calendario è aperto in modalità modale
        this.activeModal.close(timing);
      }
    });
  }

  selectSlot(event: HTMLElement) {
    if (document.querySelector('.selected')) {
      document.querySelector('.selected')?.classList.remove('selected');
    }
    event.classList.add('selected');
  }
}
