import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { AppointmentService } from '../../services/appointment.service';
import { iService } from '../../interfaces/iservice';
import { DoctorService } from '../../services/doctor.service';
import {
  iAppointmentResponseForCalendar,
  iCalendar,
} from '../../interfaces/icalendar';
import { iDoctor } from '../../interfaces/idoctorresponse';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { iPatient } from '../../interfaces/ipatientresponse';
import { AuthService } from '../../auth/auth.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CalendarService } from '../../services/calendar.service';
import { filter, switchMap } from 'rxjs';
import { iAppointmentRequest } from '../../interfaces/iappointment';
import { AuthUserComponent } from '../auth-user/auth-user.component';

@Component({
  selector: 'app-add-booking',
  templateUrl: './add-booking.component.html',
  styleUrl: './add-booking.component.scss',
})
export class AddBookingComponent {
  constructor(
    private appSvc: AppointmentService,
    private calendarSvc: CalendarService,
    private doctorSvc: DoctorService,
    private authSvc: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder
  ) {}

  calendar!: iCalendar;

  @Input() timing!: {
    startDate: string | undefined;
    endDate: string | undefined;
  };

  modalService = inject(NgbModal);

  @Output() onAppointmentCreated =
    new EventEmitter<iAppointmentResponseForCalendar>();

  newAppointment!: FormGroup;

  active = 1;

  services: iService[] = [];

  @Input() selectedService: iService = {
    id: 0,
    name: '',
    description: '',
    price: 0,
    online: false,
    isActive: false,
  };

  @Output() selectedServiceChange = new EventEmitter<iService>();

  doctor!: iDoctor;
  // addresses!: iAddressForDoctor[];
  hasOnline!: boolean | null;

  isDoctor: boolean = false;

  @Input() patient!: iPatient;

  ngOnInit() {
    this.newAppointment = this.fb.group({
      startDate: this.fb.control(null, [Validators.required]),
      endDate: this.fb.control(null, [Validators.required]),
      patientId: this.fb.control(this.patient ? this.patient.id : null),
      serviceId: this.fb.control(null, [Validators.required]),
      doctorId: this.fb.control(this.doctor ? this.doctor.id : null, [
        Validators.required,
      ]),
      doctorAddressId: this.fb.control(null),
      online: this.fb.control(false),
    });

    // Aggiorna il dottore
    this.doctorSvc.doctor$.subscribe((doctor) => {
      if (doctor) {
        this.doctor = doctor;
        this.newAppointment.get('doctorId')?.setValue(doctor.id);
      }
    });

    // Aggiorna il calendario
    this.calendarSvc.calendar$.subscribe((calendar) => {
      if (calendar) {
        this.calendar = calendar;
      }
    });

    // Gestione ruolo DOCTOR
    this.authSvc.auth$.subscribe((auth) => {
      if (auth?.role === 'DOCTOR') {
        this.isDoctor = true;
      }
    });

    // Gestione ruolo PATIENT (unifica le due subscription in una sola)
    this.authSvc.auth$
      .pipe(
        filter((auth) => auth?.role === 'PATIENT'),
        switchMap(() => this.authSvc.user$)
      )
      .subscribe((user) => {
        this.patient = user as iPatient;
        this.newAppointment.get('patientId')?.setValue(this.patient.id);
        this.cdr.detectChanges(); // Forza il refresh del template
      });

    this.setCalendar();
  }

  isTouchedInvalid(field: string) {
    return (
      this.newAppointment.get(field)?.touched &&
      this.newAppointment.get(field)?.invalid
    );
  }

  setCalendar() {
    this.services = this.getServices(this.doctor.services);
    this.hasOnline = this.setHasOnline(this.services);
  }

  // estrapolo i servizi del medico
  getServices(services: iService[]) {
    return services
      .sort((a, b) => a.id - b.id)
      .filter((s) => s.isActive === true);
  }

  // controllo se ci sono servizi disponibili online
  setHasOnline(services: iService[]) {
    return services.some((s) => s.online === true);
  }

  // gestione online / in presenza
  setOnline(online: boolean) {
    this.newAppointment.get('online')?.setValue(online);
    if (online) {
      this.newAppointment.get('doctorAddressId')?.setValue(null);
      this.newAppointment.get('doctorAddressId')?.clearValidators();
    } else {
      this.newAppointment
        .get('doctorAddressId')
        ?.setValidators([Validators.required]);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedService'] && this.newAppointment) {
      this.newAppointment.get('serviceId')?.setValue(this.selectedService.id);
    }
  }

  ngDoCheck() {
    if (this.timing) {
      this.newAppointment.get('startDate')?.setValue(this.timing.startDate);
      this.newAppointment.get('endDate')?.setValue(this.timing.endDate);
    }
  }

  bookAppointment() {
    if (
      this.newAppointment.get('startDate')?.invalid &&
      this.newAppointment.get('endDate')?.invalid
    ) {
      let calendar = document.getElementById('calendar');
      calendar?.classList.add('bounce');
      setTimeout(() => {
        calendar?.classList.remove('bounce');
      }, 1000);
    }

    if (this.patient) {
      this.addAppointment(this.newAppointment.value);
    } else {
      this.openModal().result.then((patient) => {
        this.newAppointment.get('patientId')?.setValue(patient.id);
        this.addAppointment(this.newAppointment.value);
      });
    }
  }

  addAppointment(newAppointment: iAppointmentRequest) {
    this.appSvc.addAppointment(newAppointment).subscribe((res) => {
      this.newAppointment.reset();
      this.calendarSvc.restoreCalendar();
      if (this.isDoctor) {
        this.onAppointmentCreated.emit(res);
      }
      if (!this.isDoctor) {
        setTimeout(() => {
          this.router.navigate(['/conferma-prenotazione']);
        }, 200);
      }
    });
  }

  openModal() {
    return this.modalService.open(AuthUserComponent, {
      centered: true,
      size: 'lg',
      scrollable: true,
    });
  }
}
