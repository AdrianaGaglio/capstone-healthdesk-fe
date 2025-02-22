import { iPatientRequest } from './ipatientrequest';

export interface iRegisterRequest {
  email: string;
  password?: string;
  code?: string;
  patient: iPatientRequest;
}
