export interface iAddress {
  id: number;
  street: string;
  streetNumber: string;
  province: string;
  provinceAcronym: string;
  city: string;
  postalCode: string;
  additional: string;
}

export interface iAddressForDoctor {
  name: string;
  doctorAddress: iAddress;
}
