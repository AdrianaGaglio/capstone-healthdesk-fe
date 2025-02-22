import { iDoctorRequest } from './idoctorrequest';
import { iPatientRequest } from './ipatientrequest';

export interface iRegisterRequest {
  email: string;
  password?: string;
}

export interface iPatientRegisterRequest extends iRegisterRequest {
  patient: iPatientRequest;
}

export interface iDoctorRegisterRequest extends iRegisterRequest {
  doctor: iDoctorRequest;
}

export interface iAdminRegisterRequest extends iRegisterRequest {
  code: string;
}
