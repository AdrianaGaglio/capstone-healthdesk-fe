export interface iAddressRequest {
  street: string;
  streetNumber: string;
  provinceAcronym: string;
  cityName: string;
  postalCode: string;
  additional?: string;
}

export interface iAddressRequestForDoctor extends iAddressRequest {
  name: string;
}
