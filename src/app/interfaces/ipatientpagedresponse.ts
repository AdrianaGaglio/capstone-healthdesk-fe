import { iPageable, iSort2 } from './ipageable';
import { iPatient } from './ipatientresponse';

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
