import { ComponentType } from 'react';
import { Step1 } from '@/components/Booking/PersonalBooking/steps/Step1/Step1.tsx';
import { Step2 } from '@/components/Booking/PersonalBooking/steps/Step2.tsx';
import { Step3 } from '@/components/Booking/PersonalBooking/steps/Step3.tsx';
import { Step4 } from '@/components/Booking/PersonalBooking/steps/Step4/Step4.tsx';
import {
  IAppointment,
  IDoctor,
  ILpus,
  ISpecialty,
} from '@/api/services/lpus-controller/lpus-controller.types.ts';
import { Step5 } from '@/components/Booking/PersonalBooking/steps/Step5.tsx';
export interface AppointmentFormData {
  lpu: ILpus | null;
  specialty: ISpecialty | null;
  doctor: IDoctor | null;
  appointment: IAppointment | null;

  lastName: string;
  firstName: string;
  birthDate: string;
  snils: string;
  polisN: string;
  phone: string;
  mail: string;
}

export interface StepConfig {
  id: string;
  title: string;
  component: ComponentType;
  fields: (keyof AppointmentFormData)[];
  required?: boolean;
}

export const STEPS_CONFIG: StepConfig[] = [
  {
    id: 'pacientData',
    title: 'Данные пациента',
    component: Step5,
    fields: [
      'lastName',
      'firstName',
      'birthDate',
      'snils',
      'polisN',
      'phone',
      'mail' /*, 'consentAgreement'*/,
    ],
    required: true,
  },
  {
    id: 'medicalOrganization',
    title: 'Выбор медучреждения',
    component: Step1,
    fields: ['lpu'],
    required: true,
  },
  {
    id: 'specialty',
    title: 'Выбор специальности',
    component: Step2,
    fields: ['specialty'],
    required: true,
  },
  {
    id: 'doctor',
    title: 'Выбор врача',
    component: Step3,
    fields: ['doctor'],
    required: true,
  },
  {
    id: 'datetime',
    title: 'Выбор времени',
    component: Step4,
    fields: ['appointment'],
    required: true,
  },
];

// Автоматически генерируем defaultValues из конфигурации
export const getDefaultValues = (): AppointmentFormData => {
  const defaultValues: Partial<AppointmentFormData> = {};

  STEPS_CONFIG.forEach(step => {
    step.fields.forEach(field => {
      if (field === 'lpu') {
        defaultValues[field] = null;
      } else if (field === 'specialty') {
        defaultValues[field] = null;
      } else if (field === 'doctor') {
        defaultValues[field] = null;
      } else if (field === 'appointment') {
        defaultValues[field] = null;
      } else {
        defaultValues[field] = '';
      }
    });
  });

  return defaultValues as AppointmentFormData;
};
