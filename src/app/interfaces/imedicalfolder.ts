import { iAddress } from './iaddress';
import { iDoctor, iService } from './idoctor';

export interface iMedicalFolder {
  id: number;
  appointments: iAppointmentResponseForMF[];
  prescriptions: iPrescription[];
  documentation: iDocumentation[];
  reminders: iReminder[];
  notes?: iNote[];
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

export interface iNote {
  id: number;
  date: string;
  title: string;
  description: string;
}
