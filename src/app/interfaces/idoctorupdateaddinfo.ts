import { iAddressRequestForDoctor } from './iaddressrequest';
import { iSpecialization, iService, iExperience, iTraining } from './idoctor';

export interface iDoctorUpdateAddInfo {
  id: number;
  specializations: Partial<iSpecialization>[];
  services: Partial<iService>[];
  experiences: Partial<iExperience>[];
  trainings: Partial<iTraining>[];
  addresses: iAddressRequestForDoctor[];
  payments: string[]; // lista nomi metodi di pagamento
}
