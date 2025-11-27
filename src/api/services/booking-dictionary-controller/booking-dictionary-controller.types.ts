export interface ILpus {
  id: number;
  address: string;
  lpuShortName: string;
  lpuFullName: string;
  districtName: string;
  phone: string;
  email: string;
  latitude: string;
  longitude: string;
  covidVaccination: boolean;
  inDepthExamination: boolean;
  isActive: boolean;
}

export interface ISpecialty {
  id: string;
  ferId: string;
  name: string;
  countFreeParticipant: number;
  countFreeTicket: number;
  lastDate: string;
  nearestDate: string;
}

export interface IDoctor {
  ariaNumber: string;
  ariaType: string | null;
  comment: string | null;
  freeParticipantCount: number;
  freeTicketCount: number;
  id: string;
  name: string;
  firstName: null | string;
  lastDate: null | string;
  lastName: null | string;
  middleName: null | string;
  nearestDate: string;
}

export interface IAppointment {
  id: string;
  visitStart: string;
  visitEnd: string;
  address: string | null;
  number: string | null;
  room: string;
}

export interface ITimeTable {
  appointments: IAppointment[];
  denyCause: string | null;
  recordableDay: boolean;
  visitStart: string;
  visitEnd: string;
}

export interface UserDataParams {
  lastName: string;
  firstName: string;
  middleName?: string;
  birthDate: string;
  polisN: string;

  gender?: string;
  snils?: string;
  polisS?: string;
  phoneField?: string;
  mail?: string;
  comments?: string;
}
