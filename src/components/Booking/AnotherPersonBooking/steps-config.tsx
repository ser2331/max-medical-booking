import { ComponentType } from 'react';
import { Step1 as Step2 } from '@/components/Booking/AnotherPersonBooking/steps/Step1/Step1.tsx';
import { Step2 as Step3 } from '@/components/Booking/AnotherPersonBooking/steps/Step2.tsx';
import { Step3 as Step4 } from '@/components/Booking/AnotherPersonBooking/steps/Step3.tsx';
import { Step4 as Step5 } from '@/components/Booking/AnotherPersonBooking/steps/Step4/Step4.tsx';
import { Step5 as Step1 } from '@/components/Booking/AnotherPersonBooking/steps/Step5.tsx';
import { AppointmentFormData } from '@/components/Booking/PersonalBooking/steps-config.tsx';

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
    component: Step1,
    fields: ['lastName', 'firstName', 'birthDate', 'polisN'],
    required: true,
  },
  {
    id: 'medicalOrganization',
    title: 'Выбор медучреждения',
    component: Step2,
    fields: ['lpu'],
    required: true,
  },
  {
    id: 'specialty',
    title: 'Выбор специальности',
    component: Step3,
    fields: ['specialty'],
    required: true,
  },
  {
    id: 'doctor',
    title: 'Выбор врача',
    component: Step4,
    fields: ['doctor'],
    required: true,
  },
  {
    id: 'datetime',
    title: 'Выбор времени',
    component: Step5,
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
