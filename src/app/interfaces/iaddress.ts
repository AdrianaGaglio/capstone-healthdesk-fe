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

export interface iProvince {
  code: string;
  name: string;
  acronym: string;
  region: string;
}

export interface iCity {
  name: string;
  code: string;
  postalCode: string;
  provinceAcronym: string;
}
