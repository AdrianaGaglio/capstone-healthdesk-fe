import { iAddress } from './iaddress';
import { iPageable, iSort2 } from './ipageable';

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

export interface iPatientPaged {
  content: iPatient[];
  pageable: iPageable;
  last: boolean;
  totalPages: number;
  totalElements: number;
  first: boolean;
  size: number;
  number: number;
  sort: iSort2;
  numberOfElements: number;
  empty: boolean;
}
