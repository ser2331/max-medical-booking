import { Step1 } from '@/components/Booking/DistrictBooking/steps/Step1.tsx';
import { Step2 } from '@/components/Booking/DistrictBooking/steps/Step2.tsx';
import { Step3 } from '@/components/Booking/DistrictBooking/steps/Step3.tsx';
import { Step4 } from '@/components/Booking/DistrictBooking/steps/Step4.tsx';
import { Step5 } from '@/components/Booking/DistrictBooking/steps/Step5.tsx';
export interface AppointmentFormData {
  district: string;
  lpu: string;
  doctor: string;
  date: string;
  time: string;
  patientName: string;
  patientPhone: string;
  patientEmail: string;
  comments: string;
}

export interface StepConfig {
  id: string;
  title: string;
  component: React.ComponentType;
  fields: (keyof AppointmentFormData)[];
  required?: boolean;
}

export const STEPS_CONFIG: StepConfig[] = [
  {
    id: 'service',
    title: 'Выбор медорганизации',
    component: Step1,
    fields: ['district', 'lpu'],
    required: true,
  },
  {
    id: 'specialty',
    title: 'Выбор специальности',
    component: Step2,
    fields: ['doctor'],
    required: true,
  },
  {
    id: 'doctor',
    title: 'Выбор врача',
    component: Step3,
    fields: ['date', 'time'],
    required: true,
  },
  {
    id: 'datetime',
    title: 'Выбор времени',
    component: Step4,
    fields: ['patientName', 'patientPhone'],
    required: true,
  },
  {
    id: 'makingRecord',
    title: 'Оформление записи',
    component: Step5,
    fields: ['patientEmail', 'comments'],
    required: false,
  },
];

// Автоматически генерируем defaultValues из конфигурации
export const getDefaultValues = (): AppointmentFormData => {
  const defaultValues: Partial<AppointmentFormData> = {};

  STEPS_CONFIG.forEach(step => {
    step.fields.forEach(field => {
      defaultValues[field] = '';
    });
  });

  return defaultValues as AppointmentFormData;
};

// Хелперы для работы со steps
export const getStepFields = (stepIndex: number): (keyof AppointmentFormData)[] => {
  return STEPS_CONFIG[stepIndex]?.fields || [];
};

export const getFieldsUpToStep = (stepIndex: number): (keyof AppointmentFormData)[] => {
  const fields: (keyof AppointmentFormData)[] = [];
  for (let i = 0; i <= stepIndex; i++) {
    fields.push(...getStepFields(i));
  }
  return fields;
};

export const getStepByField = (field: keyof AppointmentFormData): number => {
  return STEPS_CONFIG.findIndex(step => step.fields.includes(field));
};
