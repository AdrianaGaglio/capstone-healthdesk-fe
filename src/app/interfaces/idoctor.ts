import { iAddressForDoctor } from './iaddress';

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

export interface iSpecialization {
  id: number;
  name: string;
  description: string;
  date: string;
}

export interface iService {
  id: number;
  name: string;
  description: string;
  price: number;
  online: boolean;
  isActive: boolean;
}

export interface iExperience {
  id: number;
  startDate: string;
  endDate: string | null;
  name: string;
  description: string;
}

export interface iTraining {
  id: number;
  startDate: string;
  endDate: string | null;
  name: string;
  description: string;
}

export interface iPaymentmethod {
  id: number;
  name: string;
  description: string;
  category: string;
  priority: number;
}
