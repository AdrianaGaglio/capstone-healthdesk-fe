import { AuthService } from './../../auth/auth.service';
import { Component, inject, OnInit } from '@angular/core';
import { CalendarService } from '../../services/calendar.service';
import { iCalendar } from '../../interfaces/icalendar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { iPatient } from '../../interfaces/ipatient';
import { DoctorService } from '../../services/doctor.service';
import { iDoctor, iService } from '../../interfaces/idoctor';
import { combineLatest } from 'rxjs';
import { iTiming } from '../../interfaces/itiming';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthFormComponent } from '../auth/auth-form.component';
import { iAppointmentRequest } from '../../interfaces/iappointment';
import { AppointmentService } from '../../services/appointment.service';

@Component({
  selector: 'app-add-booking',
  templateUrl: './add-booking.component.html',
  styleUrl: './add-booking.component.scss',
})
export class AddBookingComponent implements OnInit {
  private modalService = inject(NgbModal);

  constructor(
    private calendarSvc: CalendarService,
    private authSvc: AuthService,
    private doctorSvc: DoctorService,
    private appSvc: AppointmentService,
    private fb: FormBuilder
  ) {}

  calendar!: iCalendar;

  appointmentRequest!: FormGroup;

  patient!: iPatient;

  doctor!: iDoctor;
  services!: iService[];
  hasOnline!: boolean;

  ngOnInit() {
    this.appointmentRequest = this.fb.group({
      startDate: this.fb.control(null, [Validators.required]),
      endDate: this.fb.control(null, [Validators.required]),
      patientId: this.fb.control(null),
      serviceId: this.fb.control(null, [Validators.required]),
      doctorId: this.fb.control(null, [Validators.required]),
      doctorAddressId: this.fb.control(null),
      online: this.fb.control(false, [Validators.required]),
    });

    this.authSvc.auth$.subscribe((auth) => {
      if (auth && auth.role === 'PATIENT') {
        this.authSvc.user$.subscribe((user) => {
          if (user) {
            this.patient = user as iPatient;
            this.appointmentRequest.get('patientId')?.setValue(this.patient.id);
          }
        });
      }
    });

    combineLatest([
      this.calendarSvc.calendar$,
      this.doctorSvc.doctor$,
    ]).subscribe(([calendar, doctor]) => {
      if (calendar) {
        this.calendar = calendar;
        this.appointmentRequest.get('doctorId')?.setValue(calendar.doctorId);
      }

      if (doctor) {
        this.doctor = doctor;
        this.services = this.doctor.services.filter((s) => s.isActive);
        this.hasOnline = this.services.some((s) => s.online);
      }
    });
  }

  setOnline(online: boolean) {
    if (this.appointmentRequest) {
      this.appointmentRequest.get('online')?.setValue(online);

      if (!online) {
        this.appointmentRequest
          .get('doctorAddressId')
          ?.setValidators([Validators.required]);
      } else {
        this.appointmentRequest.get('doctorAddressId')?.clearValidators();
        this.appointmentRequest.get('doctorAddressId')?.setValue(null);
      }
    }
  }

  setTime(timing: iTiming) {
    this.appointmentRequest.get('startDate')?.setValue(timing.startDate);
    this.appointmentRequest.get('endDate')?.setValue(timing.endDate);
  }

  isTouchedInvalid(field: string) {
    return (
      this.appointmentRequest.get(field)?.touched &&
      this.appointmentRequest.get(field)?.invalid
    );
  }

  submit() {
    let patientId = this.appointmentRequest.get('patientId')?.value;
    if (!patientId) {
      this.openAuthModal()
        .result.then((patientId) => {
          this.appointmentRequest.get('patientId')?.setValue(patientId);
          this.addAppointment(this.appointmentRequest.value);
        })
        .catch((error) => {
          console.log(error);
          this.modalService.dismissAll();
        });
    } else {
      this.addAppointment(this.appointmentRequest.value);
    }
  }

  addAppointment(request: iAppointmentRequest) {
    this.appSvc.addAppointment(request).subscribe((res) => {
      this.appointmentRequest.reset();
    });
  }

  openAuthModal() {
    const modalRef = this.modalService.open(AuthFormComponent, {
      centered: true,
      size: 'lg',
    });

    modalRef.componentInstance.bookingRequest = true;

    return modalRef;
  }
}
