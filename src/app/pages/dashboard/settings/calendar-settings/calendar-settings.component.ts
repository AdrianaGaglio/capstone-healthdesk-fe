import { Component, inject, OnInit } from '@angular/core';
import { UtilitiesService } from '../../../../services/utilities.service';
import { CalendarService } from '../../../../services/calendar.service';
import {
  iCalendar,
  iActiveDay,
  iActiveDayUpdate,
  iHolidayrequest,
} from '../../../../interfaces/icalendar';
import { AppointmentService } from '../../../../services/appointment.service';
import { iTiming } from '../../../../interfaces/itiming';
import { ModalFeedbackComponent } from '../../../../shared/modalfeedback/modalfeedback.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-calendar-settings',
  templateUrl: './calendar-settings.component.html',
  styleUrl: './calendar-settings.component.scss',
})
export class CalendarSettingsComponent implements OnInit {
  constructor(
    private calendarSvc: CalendarService,
    private utilities: UtilitiesService,
    private appointmentSvc: AppointmentService
  ) {}

  private modalService = inject(NgbModal);

  calendar!: iCalendar;

  days: iActiveDay[] = [];

  today: string = '';

  times = Array(13)
    .fill(0)
    .map((_, i) => {
      let hour = i + 8;
      return hour < 10 ? '0' + hour + ':00:00' : hour + ':00:00';
    });

  edit: boolean = false;
  editHoliday!: boolean;

  ngOnInit() {
    this.calendarSvc.calendar$.subscribe((calendar) => {
      if (calendar) {
        this.calendar = calendar;
        this.calendarSettings(this.calendar);
      }
    });
  }

  calendarSettings(calendar: iCalendar) {
    this.days = this.calendar.days.sort((a, b) => a.id! - b.id!);

    this.days.forEach((day) => {
      if (day.slots.length < 1) {
        day.slots.push({
          startTime: '08:00:00',
          endTime: '20:00:00',
        });
      }
      day.slots.forEach((slot) => {
        if (!slot.startTime) slot.startTime = '';
        if (!slot.endTime) slot.endTime = '';
      });
      day.slots.sort((a, b) => a.startTime.localeCompare(b.startTime));
    });
  }

  setDayName(day: string) {
    return this.utilities.setDay(day);
  }

  toggleEditing() {
    this.edit = !this.edit;
    if (!this.edit) {
      this.calendarSvc.restoreCalendar();
    }
  }

  handleExtraRange(day: iActiveDay, value: boolean) {
    day.hasExtraRange = value;
    if (!value) {
      day.extraRange = [];
    } else {
      // gestisco slot extra
      if (day.extraRange.length < 1) {
        day.extraRange.push({
          startTime: '08:00:00',
          endTime: '20:00:00',
        });
      }
      day.extraRange.forEach((slot) => {
        if (!slot.startTime) slot.startTime = '';
        if (!slot.endTime) slot.endTime = '';
      });
      day.extraRange.sort((a, b) => a.startTime.localeCompare(b.startTime));
    }
  }

  updateDays() {
    this.days.forEach((day) => {
      if (day.slots.length > 0) {
        let startTime = new Date(`1970-01-01T${day.slots[0].startTime}`);
        let endTime = new Date(
          `1970-01-01T${day.slots[day.slots.length - 1].endTime}`
        );
        let diffInMs = endTime.getTime() - startTime.getTime();
        diffInMs = diffInMs / (1000 * 60 * 60);
        day.slots = [];
        for (let i = 0; i < diffInMs; i++) {
          let slotStart = new Date(startTime.getTime() + i * 60 * 60 * 1000);
          let slotEnd = new Date(
            startTime.getTime() + (i + 1) * 60 * 60 * 1000
          ); // Ora successiva

          day.slots.push({
            startTime: slotStart.toTimeString().slice(0, 8),
            endTime: slotEnd.toTimeString().slice(0, 8),
          });
        }
      }

      if (day.extraRange.length > 0) {
        let startTime = new Date(`1970-01-01T${day.extraRange[0].startTime}`);
        let endTime = new Date(
          `1970-01-01T${day.extraRange[day.extraRange.length - 1].endTime}`
        );
        let diffInMs = endTime.getTime() - startTime.getTime();
        diffInMs = diffInMs / (1000 * 60 * 60);
        day.extraRange = [];
        for (let i = 0; i < diffInMs; i++) {
          let slotStart = new Date(startTime.getTime() + i * 60 * 60 * 1000);
          let slotEnd = new Date(
            startTime.getTime() + (i + 1) * 60 * 60 * 1000
          ); // Ora successiva

          day.extraRange.push({
            startTime: slotStart.toTimeString().slice(0, 8),
            endTime: slotEnd.toTimeString().slice(0, 8),
          });
        }
      }
    });

    let updateRequest: iActiveDayUpdate[] = [];

    this.days.forEach((day) => {
      let request!: iActiveDayUpdate;
      let allSlots = day.slots.flatMap((slot) => slot);

      allSlots = allSlots.sort(
        (a, b) =>
          new Date(`1970-01-01T${a.startTime}`).getTime() -
          new Date(`1970-01-01T${b.startTime}`).getTime()
      );

      let slotMinTime = allSlots[0].startTime;
      let slotMaxTime = allSlots[allSlots.length - 1].endTime;

      request = {
        dayName: day.dayName,
        startTime: day.isActive ? slotMinTime : '',
        endTime: day.isActive ? slotMaxTime : '',
        isActive: day.isActive,
      };

      if (day.extraRange.length > 0) {
        let extras = day.extraRange.flatMap((extra) => extra);
        extras = extras.sort(
          (a, b) =>
            new Date(`1970-01-01T${a.startTime}`).getTime() -
            new Date(`1970-01-01T${b.startTime}`).getTime()
        );

        let extraMinTime = extras[0].startTime;
        let extraMaxTime = extras[extras.length - 1].endTime;

        request = {
          ...request,
          extraRange: {
            startTime: extraMinTime,
            endTime: extraMaxTime,
          },
        };
      }
      updateRequest.push(request);
    });

    this.calendarSvc
      .manageDays(this.calendar.id!, updateRequest)
      .subscribe((res) => {
        this.calendarSvc.restoreCalendar();
        this.edit = false;

        this.openModal('Agenda modificata con successo');
      });
  }

  changeStatus(isActive: boolean) {
    this.calendarSvc
      .changeStatus(this.calendar.id!, isActive)
      .subscribe((res) => {
        this.calendarSvc.restoreCalendar();

        this.openModal('Stato agenda aggiornato con successo');
      });
  }

  updateHolidayInfo() {
    if (this.calendar.onHoliday) {
      this.editHoliday = true;
    }
    if (!this.calendar.onHoliday) {
      this.calendar.holidayDateStart = '';
      this.calendar.holidayDateEnd = '';
      this.manageHoliday();
    }
  }

  manageHoliday() {
    let request: iHolidayrequest = {
      calendarId: this.calendar.id!,
      holidayDateStart: this.calendar.holidayDateStart,
      holidayDateEnd: this.calendar.holidayDateEnd,
      onHoliday: this.calendar.onHoliday,
    };

    this.calendarSvc
      .manageHoliday(this.calendar.id!, request)
      .subscribe((res) => {
        this.calendarSvc.restoreCalendar();
        this.editHoliday = false;
        this.calendar.onHoliday = res.onHoliday;
        this.calendar.holidayDateStart = res.holidayDateStart;
        this.calendar.holidayDateEnd = res.holidayDateEnd;
        let message = this.calendar.onHoliday
          ? 'Periodo sospensione inserito correttamente!'
          : 'Perido sospensione agenda rimosso correttamente!';

        this.openModal(message);
      });
  }

  blockSlot(timing: iTiming) {
    let request = {
      ...timing,
      doctorId: this.calendar.doctorId,
    };
    this.appointmentSvc.blockSlot(request).subscribe((res) => {
      this.calendarSvc.restoreCalendar();

      this.openModal('Orario bloccato correttamente');
      this.calendarSvc.restoreCalendar();
    });
  }

  unlockSlot(id: number) {
    this.appointmentSvc.unlockSlot(id).subscribe((res) => {
      this.openModal(res.message);
      this.calendarSvc.restoreCalendar();
    });
  }

  openModal(message: string) {
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
