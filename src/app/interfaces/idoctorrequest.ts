import { iAddressRequestForDoctor } from './iaddressrequest';

export interface iDoctorRequest {
  name: string;
  surname: string;
  avatar: string;
  phoneNumber: string;
  licenceNumber: string;
  addresses?: iAddressRequestForDoctor[];
}
