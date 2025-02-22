import { iDoctorRequest } from './idoctorrequest';
import { iDoctor } from './idoctorresponse';

export interface iDoctorregister {
  email: string;
  password: string;
  doctor: iDoctorRequest;
}
