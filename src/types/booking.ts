export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  birthDate: string;
  phone?: string;
  email?: string;
  snils?: string;
}

export interface MedicalInstitution {
  id: string;
  name: string;
  type: 'polyclinic' | 'hospital' | 'clinic' | 'diagnostic';
  address: string;
  phone: string;
  email?: string;
  isAttached: boolean;
}

export interface Specialization {
  id: string;
  name: string;
  availableSlots: number;
}

export interface Doctor {
  id: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  specialization: string;
  rating?: number;
  experience?: number;
  hasAvailableSlots: boolean;
}

export interface TimeSlot {
  id: string;
  date: string;
  time: string;
  datetime: string;
  isAvailable: boolean;
}

export interface Appointment {
  id: string;
  patient: Patient;
  doctor: Doctor;
  institution: MedicalInstitution;
  specialization: Specialization;
  dateTime: string;
  room: string;
  status: 'confirmed' | 'pending' | 'cancelled';
}

export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  birthDate: string;
  gender?: 'male' | 'female';
  phone?: string;
  email?: string;
  snils?: string;
  policyNumber?: string;
}

// Для формы добавления пациента
export interface PatientFormData {
  lastName: string;
  firstName: string;
  middleName?: string;
  birthDate: string;
  gender?: 'male' | 'female';
  snils?: string;
  policyNumber?: string;
  phone?: string;
  email?: string;
  consent: boolean;
}
