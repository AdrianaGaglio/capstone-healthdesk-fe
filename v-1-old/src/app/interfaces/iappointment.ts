import { iAddress } from './iaddressresponse';
import { iPatientResponseForCalendar } from './icalendar';
import { iDoctor } from './idoctorresponse';
import { iPatient } from './ipatientresponse';
import { iService } from './iservice';

export interface iAppointment {
  id: number;
  startDate: string;
  endDate: string;
  doctor: iDoctor;
  patient: iPatient;
  service: iService;
  status: string;
  address: iAddress;
  online: boolean;
}

export interface iAppointmentRequest {
  startDate: string;
  endDate: string;
  patientId: number;
  serviceId: number;
  doctorId: number;
  doctorAddressId: number | null;
  online: boolean;
}
