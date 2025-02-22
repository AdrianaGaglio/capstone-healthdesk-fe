import { iAppointmentResponseForCalendar } from './../../interfaces/icalendar';
import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  CalendarOptions,
  DayCellMountArg,
  EventClickArg,
} from '@fullcalendar/core';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import { iActiveDay, iCalendar } from '../../interfaces/icalendar';
import { iEvent } from '../../interfaces/ievent';
import { CalendarService } from '../../services/calendar.service';
import { AuthService } from '../../auth/auth.service';
import { CalendarUtilsService } from '../../services/calendar-utils.service';
import { iTiming } from '../../interfaces/itiming';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
})
export class CalendarComponent implements OnInit {
  constructor(
    private calendarSvc: CalendarService,
    private utils: CalendarUtilsService,
    private authSvc: AuthService,
    private router: Router
  ) {}

  private activeModal = inject(NgbActiveModal);

  days!: iActiveDay[];
  calendar!: iCalendar;

  slots: iEvent[] = [];

  @Input() slotMinTime!: string;
  @Input() slotMaxTime!: string;
  @Input() height!: number;
  @Input() filterForDoctor: string = 'prev,next';

  @Input() modal!: boolean;

  @Output() timing = new EventEmitter<iTiming>();
  @Output() emitAppointment =
    new EventEmitter<iAppointmentResponseForCalendar>();
  @Output() emitAppId = new EventEmitter<number>();

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

  handleEventClick(arg: EventClickArg) {
    let startDate = new Date(arg.event.start!);
    let endDate = new Date(arg.event.end!);

    let event = arg.jsEvent.target as HTMLElement;
    event = event.closest('a') as HTMLElement;

    // aggiungo un'ora (al click di default seleziona un'ora indietro)
    startDate.setHours(startDate.getHours() + 1);
    endDate.setHours(endDate.getHours() + 1);

    // riconverto in stringa
    let startDateString = startDate.toISOString().slice(0, -5);
    let endDateString = endDate.toISOString().slice(0, -5);

    let app = this.calendar.appointments.find(
      (app: iAppointmentResponseForCalendar) =>
        app.startDate === startDateString
    );

    this.authSvc.auth$.subscribe((auth) => {
      if (auth) {
        // se è un medico o un amministratore
        if (auth.role === 'DOCTOR') {
          if (app) {
            // se clicco su un appuntamento, vengono emessi i dati dell'appuntamento x essere gestiti
            // dal componente padre
            if (app.status !== 'BLOCKED') {
              this.emitAppointment.emit(app);
            } else {
              this.emitAppId.emit(app.id);
            }
          } else {
            // altrimenti, se la data non e' passata, vengono emessi gli orari
            // per gestire il blocco o la creazione di un nuovo appuntamento
            if (startDate.getTime() >= Date.now()) {
              this.timing.emit({
                startDate: startDateString,
                endDate: endDateString,
              });

              if (document.querySelector('.selected')) {
                document
                  .querySelector('.selected')
                  ?.classList.remove('selected');
              }
              event.classList.add('selected');
            }
          }
        } else if (auth.role !== 'ADMIN' && auth.role !== 'DOCTOR') {
          // se è un paziente, vengono emessi gli orari dello slot cliccato
          let timing = {
            startDate: startDateString,
            endDate: endDateString,
          };

          if (document.querySelector('.selected')) {
            document.querySelector('.selected')?.classList.remove('selected');
          }
          event.classList.add('selected');

          this.timing.emit(timing);
          // serve per quanto il calendario è aperto in modalità modale
          this.activeModal.close(timing);
        }
      } else {
        // anche se l'utente non è loggato, vengono emessi gli orari dello slot cliccato
        if (!app) {
          this.timing.emit({
            startDate: startDateString,
            endDate: endDateString,
          });

          if (document.querySelector('.selected')) {
            document.querySelector('.selected')?.classList.remove('selected');
          }
          event.classList.add('selected');
        }
      }
    });
  }

  // configura il calendario in base ai dati passati in input
  // necessario perché al caricamento il calendario è già configurato
  ngOnChanges(changes: SimpleChanges) {
    if (this.authSvc.auth$.getValue()?.role !== 'DOCTOR') {
      this.calendarOptions = {
        ...this.calendarOptions,
        validRange: {
          // mostra il calendario a partire dalla settimana corrente
          start: new Date().toISOString().split('T')[0], // Imposta la data di inizio alla settimana corrente
        },
      };
    }

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

    if (changes['calendar']) {
      console.log('ciao');
      this.getCalendar();
    }
  }

  ngOnInit() {
    if (this.modal) {
      this.calendarOptions = {
        ...this.calendarOptions,
        slotMinTime: this.slotMinTime,
        slotMaxTime: this.slotMaxTime,
      };
    }

    this.calendarSvc.calendar$.subscribe((calendar) => {
      if (calendar) {
        this.calendar = calendar!;
        this.getCalendar();
      }
    });
  }

  getCalendar() {
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

    // genero gli slot disponibili da mostrare a calendario
    this.generateSlots();
  }

  // generazione eventi calendario a partire dagli appuntamenti e dagli slot del calendario
  generateSlots() {
    this.utils
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

  slotLabelDidMount(info: DayCellMountArg) {
    if (info.isDisabled === true) {
      info.el.style.backgroundColor = '#d1d1d14c'; // Cambia colore per orari inattivi
    }

    // Orario slot attuale
    const slotTime = info.date.toISOString().split('T')[1].slice(0, 5); // HH:mm

    // controllo se lo slot è occupato
    const isOccupied = this.slots.some((event) => {
      const eventStart = event.start.split('T')[1].slice(0, 5); // HH:mm
      return eventStart === slotTime;
    });
  }
}
