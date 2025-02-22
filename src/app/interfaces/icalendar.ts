import { iAddress } from './iaddress';
import { iService } from './idoctor';

export interface iCalendar {
  id: number;
  doctorId: number;
  doctorName: string;
  days: iActiveDay[];
  appointments: iAppointmentResponseForCalendar[];
  slotMinTime: string;
  slotMaxTime: string;
  isActive: boolean;
  onHoliday: boolean;
  holidayDateStart: string;
  holidayDateEnd: string;
}

export interface iCalendarSettings {
  activeDays: iActiveDay[];
}

export interface iActiveDay {
  id: number;
  dayName: string;
  isActive: boolean;
  slots: iTimeSlot[];
  extraRange: iTimeSlot[];
  hasExtraRange: boolean;
}

export interface iTimeSlot {
  startTime: string;
  endTime: string;
}

export interface iAppointmentResponseForCalendar {
  id: number;
  startDate: string;
  endDate: string;
  service: iService;
  patient: iPatientResponseForCalendar;
  status: string;
  address: iAddress;
}

export interface iPatientResponseForCalendar {
  id: number;
  name: string;
  surname: string;
  email: string;
  taxId: string;
  avatar: string;
  phoneNumber: string;
}
