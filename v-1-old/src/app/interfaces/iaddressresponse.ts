import { iProvince } from './iprovince';
export interface iAddress {
  id: number;
  street: string;
  streetNumber: string;
  province: string;
  provinceAcronym: string;
  city: string;
  postalCode: string;
}
