import { iAddress } from './iaddress';
import { iDoctor, iService } from './idoctor';
import { iPatient } from './ipatient';

export interface iAppointment {
  id: number;
  startDate: string;
  endDate: string;
  doctor: iDoctor;
  patient: iPatient;
  service: iService;
  status: string;
  address: iAddress | null;
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
