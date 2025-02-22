import { iAddressRequestForDoctor } from './iaddressrequest';
import { iExperience, iService, iSpecialization, iTraining } from './idoctor';

export interface iDoctorUpdateAdditionalInfo {
  id: number;
  specializations: Partial<iSpecialization>[];
  services: Partial<iService>[];
  experiences: Partial<iExperience>[];
  trainings: Partial<iTraining>[];
  addresses: iAddressRequestForDoctor[];
  payments: string[]; // lista nomi metodi di pagamento
}
