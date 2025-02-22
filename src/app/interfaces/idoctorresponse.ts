import { iAddressForDoctor } from './iaddressresponsefordoctor';
import { iExperience } from './iexperience';
import { iPaymentmethod } from './ipaymentmethods';
import { iService } from './iservice';
import { iSpecialization } from './ispecialization';
import { iTraining } from './itraining';

export interface iDoctor {
  id: number;
  name: string;
  surname: string;
  email: string;
  avatar: string;
  licenceNumber: string;
  phoneNumber: string;
  title: string;
  addresses: iAddressForDoctor[];
  specializations: iSpecialization[];
  services: iService[];
  experiences: iExperience[];
  trainings: iTraining[];
  paymentMethods: iPaymentmethod[];
}
