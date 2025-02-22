import { iAddressRequest } from './iaddressrequest';

export interface iPatientRequest {
  name: string;
  surname: string;
  avatar?: string;
  taxId?: string;
  birthDate: string;
  phoneNumber: string;
  address?: iAddressRequest;
}
