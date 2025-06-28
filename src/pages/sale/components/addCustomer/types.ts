export interface CustomerFormData {
  customerCode: string
  customerName: string
  phone: string
  email: string
  address: string
  region: string
  ward: string
  birthDate: string
  gender: string
  customerType: string
  taxCode: string
  idNumber: string
  facebook: string
  group: string
  notes: string
}

export interface CustomerBasicInfoData {
  customerCode: string
  customerName: string
  phone: string
  email: string
}

export interface CustomerAddressInfoData {
  address: string
  region: string
  ward: string
}

export interface CustomerPersonalInfoData {
  birthDate: string
  gender: string
}

export interface CustomerAdditionalInfoData {
  customerType: string
  taxCode: string
  idNumber: string
  facebook: string
  group: string
  notes: string
}
