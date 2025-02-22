import { iAddress } from './iaddressresponse';
import { iDoctor } from './idoctorresponse';
import { iService } from './iservice';

export interface iMedicalFolder {
  id: number;
  appointments: iAppointmentResponseForMF[];
  prescriptions: iPrescription[];
  documentation: iDocumentation[];
  reminders: iReminder[];
}

export interface iAppointmentResponseForMF {
  id: number;
  startDate: string;
  endDate: string;
  service: iService;
  status: string;
  address: iAddress;
  doctor: iDoctor;
  online: boolean;
}

export interface iPrescription {
  id: number;
  date: string;
  file: string;
  description: string;
}

export interface iDocumentation {
  id: number;
  date: string;
  file: string;
  description: string;
}

export interface iDocumentCreate {
  file: string;
  description: string;
}

export interface iReminder {
  id: number;
  description: string;
  frequency: string;
  startDate: string;
}
