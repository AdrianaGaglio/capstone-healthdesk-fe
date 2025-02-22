import { iAddressRequestForDoctor } from './iaddressrequestfordoctor';
import { iExperience } from './iexperience';
import { iService } from './iservice';
import { iSpecialization } from './ispecialization';
import { iTraining } from './itraining';

export interface iDoctorUpdateAddInfo {
  id: number;
  specializations: Partial<iSpecialization>[];
  services: Partial<iService>[];
  experiences: Partial<iExperience>[];
  trainings: Partial<iTraining>[];
  addresses: iAddressRequestForDoctor[];
  payments: string[]; // lista nomi metodi di pagamento
}
