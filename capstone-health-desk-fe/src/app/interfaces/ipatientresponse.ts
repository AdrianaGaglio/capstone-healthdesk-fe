import { iAddress } from './iaddressresponse';

export interface iPatient {
  id: number;
  name: string;
  surname: string;
  email: string;
  avatar: string;
  taxId: string;
  birthDate: string;
  phoneNumber: string;
  address: iAddress;
  lastVisit: string;
  lastSeenOnline: string;
}
