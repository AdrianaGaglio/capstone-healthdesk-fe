import { iAppointment } from './iappointment';
import { iPageable, iSort2 } from './ipageable';

export interface iAppointmentsPaged {
  content: iAppointment[];
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
